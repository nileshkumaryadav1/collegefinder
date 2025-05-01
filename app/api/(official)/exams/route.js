import { connectToDatabase } from "@/lib/mongodb";
import Exam from "@/models/Exam";

export async function POST(req) {
  try {
    const data = await req.json();

    // console.log("Received data:", data); // Debug incoming data

    // Connect to DB
    await connectToDatabase();

    // Create and save new exam
    const exam = new Exam(data);
    await exam.save();

    return new Response(
      JSON.stringify({ message: "Exam added successfully!", exam }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding exam:", error); // Log full error
    return new Response(
      JSON.stringify({
        error: "Failed to add exam",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const exams = await Exam.find({});
    return new Response(JSON.stringify(exams), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch exams",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
