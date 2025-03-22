import { connectToDatabase } from "@/lib/mongodb";
import Scholarship from "@/models/Scholarship";
import { NextResponse } from "next/server";

// Fetch scholarship details
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const scholarship = await Scholarship.findById(params.id);
    if (!scholarship) return new Response(JSON.stringify({ message: "Scholarship not found" }), { status: 404 });
    
    return new Response(JSON.stringify(scholarship), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching scholarship" }), { status: 500 });
  }
}

// Update scholarship
export async function PUT(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const data = await req.json();
  const updatedScholarship = await Scholarship.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updatedScholarship);
}

// Delete scholarship
export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  await Scholarship.findByIdAndDelete(id);
  return NextResponse.json({ message: "Scholarship deleted successfully!" });
}
