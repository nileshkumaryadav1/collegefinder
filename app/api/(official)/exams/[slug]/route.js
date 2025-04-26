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

// Update exam
export async function PUT(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const data = await req.json();
  const updatedExam = await Exam.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updatedExam);
}

// Delete exam
export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  await Exam.findByIdAndDelete(id);
  return NextResponse.json({ message: "Exam deleted successfully!" });
}
