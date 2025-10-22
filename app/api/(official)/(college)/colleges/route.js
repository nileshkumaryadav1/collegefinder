import { connectToDatabase } from "@/lib/mongodb";
import College from "@/models/College";

export async function GET() {
  try {
    await connectToDatabase();
    const colleges = await College.find({});
    return new Response(JSON.stringify({ success: true, colleges }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching colleges" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const newCollege = new College(body);
    await newCollege.save();

    return new Response(
      JSON.stringify({ success: true, message: "College added successfully!" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding college:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error adding college",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
