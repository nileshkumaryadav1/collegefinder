import { connectToDatabase } from "@/lib/mongodb";
import Scholarship from "@/models/Scholarship";
import { NextResponse } from "next/server";
import slugify from "slugify"; // For automatic slug generation

// Utility function for error responses
const errorResponse = (message, status, error = null) => {
  return NextResponse.json(
    { success: false, message, ...(error && { error: error.message }) },
    { status }
  );
};

// GET: Fetch all scholarships
export async function GET() {
  try {
    await connectToDatabase();
    const scholarships = await Scholarship.find();
    return NextResponse.json(
      { success: true, data: scholarships },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse("Error fetching scholarships", 500, error);
  }
}

// POST: Create a new scholarship
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Auto-generate slug if not provided
    if (!body.slug) {
      body.slug = slugify(body.name, { lower: true, strict: true });
    }

    // console.log("Received data:", body); // Debugging

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { message: "At least name is required" },
        { status: 400 }
      );
    }

    // Check for unique slug
    const existingScholarship = await Scholarship.findOne({ slug: body.slug });
    if (existingScholarship) {
      return NextResponse.json(
        { message: "Scholarship with this slug already exists" },
        { status: 400 }
      );
    }

    const newScholarship = await Scholarship.create(body);
    return NextResponse.json(
      { success: true, data: newScholarship },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a scholarship by slug
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { slug } = await req.json();

    if (!slug) return errorResponse("Scholarship slug is required", 400);

    const deletedScholarship = await Scholarship.findOneAndDelete({ slug });
    if (!deletedScholarship) return errorResponse("Scholarship not found", 404);

    return NextResponse.json(
      { success: true, message: "Scholarship deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse("Error deleting scholarship", 500, error);
  }
}

// PUT: Update a scholarship by slug
export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { slug, ...updateData } = body;

    if (!slug) return errorResponse("Scholarship slug is required", 400);

    const updatedScholarship = await Scholarship.findOneAndUpdate(
      { slug },
      updateData,
      { new: true }
    );

    if (!updatedScholarship) return errorResponse("Scholarship not found", 404);

    return NextResponse.json(
      {
        success: true,
        message: "Scholarship updated successfully!",
        data: updatedScholarship,
      },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse("Error updating scholarship", 500, error);
  }
}
