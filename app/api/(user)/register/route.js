import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
    }

    await connectToDatabase();

    if (await User.findOne({ email })) {
      return new Response(JSON.stringify({ success: false, message: "Email already in use" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    // Fetch API domain from environment variables
    const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" || "http://collegefinder.vercel.app";

    // Send welcome email (non-blocking)
    fetch(`${API_DOMAIN}/api/send-welcome-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    }).catch((err) => console.error("Failed to send email:", err));

    return new Response(JSON.stringify({ success: true, message: "User registered successfully!" }), { status: 201 });

  } catch (error) {
    console.error("Register API Error:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}
