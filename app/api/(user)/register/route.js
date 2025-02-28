import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already in use" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ message: "User registered successfully", user: newUser }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
