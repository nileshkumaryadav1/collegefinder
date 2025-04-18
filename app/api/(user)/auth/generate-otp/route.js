import { connectToDatabase } from "@/lib/mongodb";
import Otp from "@/models/Otp";
import { sendOtpEmail, sendWelcomeEmail } from "@/lib/mailer";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save OTP in the database
    await Otp.create({ email, otp: hashedOtp });

    // Send OTP email to the user
    await sendOtpEmail(email, otp);

    // Check if the user exists, create a new one if not
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        password: "defaultPassword",  // Placeholder password (can be changed later)
        name: "User",       // Default name (can be updated later)
      });

      // Send a welcome email to the new user
      await sendWelcomeEmail(user.email, user.name);
    }

    return NextResponse.json({ message: "OTP sent successfully." });
  } catch (err) {
    console.error("❌ Error in generate-otp:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
