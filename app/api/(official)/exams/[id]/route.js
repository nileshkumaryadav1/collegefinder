import { connectToDatabase } from "@/lib/mongodb";
import Exam from "@/models/Exam";
import { NextResponse } from "next/server";

// Fetch exam details
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const exam = await Exam.findById(params.id);
    if (!exam) return new Response(JSON.stringify({ message: "Exam not found" }), { status: 404 });
    
    return new Response(JSON.stringify(exam), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching exam" }), { status: 500 });
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
