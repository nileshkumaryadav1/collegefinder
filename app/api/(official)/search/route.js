import { connectToDatabase } from "@/lib/mongodb";
import College from "@/models/College";
import Exam from "@/models/Exam";
import Scholarship from "@/models/Scholarship";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch data concurrently using Promise.all
    const [colleges, exams, scholarships] = await Promise.all([
      College.find(),
      Exam.find(),
      Scholarship.find(),
    ]);

    return Response.json({ colleges, exams, scholarships });
  } catch (error) {
    console.error("Error fetching search data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
