import { connectToDatabase } from "@/lib/mongodb";
import Exam from "@/models/Exam";

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
