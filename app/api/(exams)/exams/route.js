import { connectToDatabase } from "@/lib/mongodb";
import Exam from "@/models/Exam";

export async function POST(req) {
  const data = await req.json();
  await connectToDatabase();
  const exam = await new Exam(data).save();
  return new Response(JSON.stringify({ message: "College added successfully!" }), { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const exams = await Exam.find({});
  return new Response(JSON.stringify(exams), { status: 200 });
}
