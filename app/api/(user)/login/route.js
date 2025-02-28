import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return new Response(JSON.stringify({ message: "Login successful", token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
