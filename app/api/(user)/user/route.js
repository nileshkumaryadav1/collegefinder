import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    await connectToDatabase();
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid Token" }), { status: 401 });
  }
}
