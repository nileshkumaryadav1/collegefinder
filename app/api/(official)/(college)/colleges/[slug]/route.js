import { NextResponse } from "next/server";
import College from "@/models/College";
import { connectToDatabase } from "@/lib/mongodb";

// GET College by Slug
export async function GET(req) {
  await connectToDatabase();

  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop();

  try {
    const college = await College.findOne({ slug });

    if (!college) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: college });
  } catch (error) {
    console.error("GET College Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching college" },
      { status: 500 }
    );
  }
}

// DELETE College by Slug
export async function DELETE(req) {
  await connectToDatabase();

  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop();

  try {
    const deletedCollege = await College.findOneAndDelete({ slug });

    if (!deletedCollege) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "College deleted successfully" });
  } catch (error) {
    console.error("DELETE College Error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting college" },
      { status: 500 }
    );
  }
}

// PUT (Update) College by Slug
export async function PUT(req) {
  await connectToDatabase();

  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop();

  try {
    const body = await req.json(); // ✅ Parse the JSON body correctly

    const updatedCollege = await College.findOneAndUpdate(
      { slug },
      body,
      { new: true }
    );

    if (!updatedCollege) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCollege });
  } catch (error) {
    console.error("PUT College Error:", error);
    return NextResponse.json(
      { success: false, message: "Error updating college" },
      { status: 500 }
    );
  }
}
