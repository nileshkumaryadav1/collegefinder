import { NextResponse } from "next/server";
import College from "@/models/College";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req) {
  await connectToDatabase();

  // Extract `slug` from URL
  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop(); // gets the [slug] from the path

  try {
    const college = await College.findOne({ slug });
    if (!college) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: college });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error fetching college" },
      { status: 500 }
    );
  }
}

// DELETE College by Slug
export async function DELETE(req, context) {
  await connectToDatabase();

  // Extract `slug` from URL
  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop(); // gets the [slug] from the path

  try {
    await College.findOneAndDelete({ slug });
    return NextResponse.json({ success: true, message: "College deleted" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error deleting college" },
      { status: 500 }
    );
  }
}

// PUT (Update) College by Slug
export async function PUT(req, context) {
  await connectToDatabase();
  
  // Extract `slug` from URL
  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop(); // gets the [slug] from the path
  const data = await req.json();

  try {
    const updatedCollege = await College.findOneAndUpdate({ slug }, data, {
      new: true,
    });

    if (!updatedCollege) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCollege });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error updating college" },
      { status: 500 }
    );
  }
}
