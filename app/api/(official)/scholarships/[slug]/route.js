import { connectToDatabase } from "@/lib/mongodb";
import Scholarship from "@/models/Scholarship";
import { NextResponse } from "next/server";

// Get scholarship by slug
export async function GET(req, { params: { slug } }) {
  try {
    await connectToDatabase();
    const scholarship = await Scholarship.findOne({ slug });

    if (!scholarship) {
      return NextResponse.json(
        { message: "Scholarship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(scholarship, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching scholarship" },
      { status: 500 }
    );
  }
}

// Update scholarship by slug
export async function PUT(req, { params: { slug } }) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const updatedScholarship = await Scholarship.findOneAndUpdate(
      { slug },
      data,
      { new: true }
    );

    if (!updatedScholarship) {
      return NextResponse.json(
        { message: "Scholarship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedScholarship);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { message: "Error updating scholarship" },
      { status: 500 }
    );
  }
}

// Delete scholarship by slug
export async function DELETE(req, { params: { slug } }) {
  try {
    await connectToDatabase();

    const deleted = await Scholarship.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json(
        { message: "Scholarship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Scholarship deleted successfully!" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Error deleting scholarship" },
      { status: 500 }
    );
  }
}
