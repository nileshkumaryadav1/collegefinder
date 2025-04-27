import { NextResponse } from 'next/server';
import College from '@/models/College';  // Adjust this import based on your models (MongoDB/Mongoose)

export async function GET(request) {
  try {
    // Get query parameter (e.g., ?collegeIds=id1&id2&id3)
    const url = new URL(request.url);
    const collegeIds = url.searchParams.getAll('collegeIds'); // Get all college IDs from query params

    if (collegeIds.length === 0) {
      return NextResponse.json({ message: "No colleges selected" }, { status: 400 });
    }

    // Fetch college data from the database
    const colleges = await College.find({ '_id': { $in: collegeIds } });

    // Return the data in the response
    return NextResponse.json(colleges);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching colleges" }, { status: 500 });
  }
}
