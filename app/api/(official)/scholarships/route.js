import { connectToDatabase } from "@/lib/mongodb";
import Scholarship from "@/models/Scholarship";
import { NextResponse } from "next/server";

// Utility function for error responses
const errorResponse = (message, status, error = null) => {
  return NextResponse.json(
    { success: false, message, ...(error && { error: error.message }) },
    { status }
  );
};

// Get all scholarships
export async function GET() {
  try {
    await connectToDatabase();
    const scholarships = await Scholarship.find();
    return NextResponse.json({ success: true, data: scholarships }, { status: 200 });
  } catch (error) {
    return errorResponse("Error fetching scholarships", 500, error);
  }
}

// Create a new scholarship
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    console.log("Received data:", body); // Debugging

    if (!body.name || !body.about || !body.amount || !body.eligibility || !body.deadline || !body.officialLink) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newScholarship = await Scholarship.create(body);
    return NextResponse.json(newScholarship, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Delete a scholarship
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) return errorResponse("Scholarship ID is required", 400);

    const deletedScholarship = await Scholarship.findByIdAndDelete(id);
    if (!deletedScholarship) return errorResponse("Scholarship not found", 404);

    return NextResponse.json({ success: true, message: "Scholarship deleted successfully!" }, { status: 200 });
  } catch (error) {
    return errorResponse("Error deleting scholarship", 500, error);
  }
}

// Update a scholarship
export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) return errorResponse("Scholarship ID is required", 400);

    const updatedScholarship = await Scholarship.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedScholarship) return errorResponse("Scholarship not found", 404);

    return NextResponse.json(
      { success: true, message: "Scholarship updated successfully!", data: updatedScholarship },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse("Error updating scholarship", 500, error);
  }
}
