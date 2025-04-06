import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    if (await User.findOne({ email })) {
      return new Response(
        JSON.stringify({ success: false, message: "Email already in use" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    // Fetch API domain from environment variables
    const API_DOMAIN =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:3000" ||
      "http://collegefinder.vercel.app";

    try {
      const response = await fetch(`${API_DOMAIN}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Email Sending API failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Email Sent Successfully:", data.message);
    } catch (error) {
      console.error("Failed to send email:", error.message);
    }

    // response
    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully!",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
