import { NextResponse } from "next/server";
import College from "@/models/College"; // Import your Mongoose model
import { connectToDatabase } from "@/lib/mongodb";

// ✅ Get College by ID (Fixed)
export async function GET(req, { params }) {
  await connectToDatabase(); // Ensure DB connection

  try {
    const { id } = await params; // ✅ Await params before destructuring
    const college = await College.findById(id);

    if (!college) {
      return NextResponse.json({ message: "College not found" }, { status: 404 });
    }

    return NextResponse.json(college, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching college", error }, { status: 500 });
  }
}

// ✅ Update College by ID (Fixed)
export async function PUT(req, { params }) {
  await connectToDatabase();

  try {
    const { id } = await params; // ✅ Await params
    const data = await req.json();
    const updatedCollege = await College.findByIdAndUpdate(id, data, { new: true });

    if (!updatedCollege) {
      return NextResponse.json({ message: "College not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCollege, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating college", error }, { status: 500 });
  }
}

// ✅ Delete College by ID (Fixed)
export async function DELETE(req, { params }) {
  await connectToDatabase();

  try {
    const { id } = await params; // ✅ Await params
    const deletedCollege = await College.findByIdAndDelete(id);

    if (!deletedCollege) {
      return NextResponse.json({ message: "College not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "College deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting college", error }, { status: 500 });
  }
}
