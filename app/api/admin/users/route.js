// /api/admin/users/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  await connectToDatabase();

  const students = await User.find().lean();

  // console.log(students);

  const enrichedStudents = students.map((student) => {
    return {
      ...student,
    };
  });

  return NextResponse.json(enrichedStudents);
}
