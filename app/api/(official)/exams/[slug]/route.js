import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Exam from "@/models/Exam";

export async function GET(req) {
  await connectToDatabase();

  // Extract `slug` from URL
  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop(); // gets the [slug] from the path

  try {
    const exam = await Exam.findOne({ slug });
    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: exam });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error fetching exam" },
      { status: 500 }
    );
  }
}

// UPDATE exam by slug
export async function PUT(req, { params }) {
  await connectToDatabase();
  const { slug } = params;
  const data = await req.json();

  try {
    const updatedExam = await Exam.findOneAndUpdate({ slug }, data, {
      new: true,
    });

    if (!updatedExam) {
      return NextResponse.json(
        { success: false, message: "Exam not found for update" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedExam });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error updating exam" },
      { status: 500 }
    );
  }
}

// DELETE exam by slug
export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { slug } = params;

  try {
    const deletedExam = await Exam.findOneAndDelete({ slug });

    if (!deletedExam) {
      return NextResponse.json(
        { success: false, message: "Exam not found for deletion" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Exam deleted successfully!",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error deleting exam" },
      { status: 500 }
    );
  }
}
