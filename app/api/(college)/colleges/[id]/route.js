import { connectToDatabase } from "@/lib/mongodb";
import College from "@/models/College";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const college = await College.findById(params.id);
    
    if (!college) {
      return new Response(JSON.stringify({ message: "College not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(college), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching college" }), { status: 500 });
  }
}
