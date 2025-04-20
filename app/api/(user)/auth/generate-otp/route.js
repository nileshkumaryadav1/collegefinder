import { connectToDatabase } from "@/lib/mongodb";
import Otp from "@/models/Otp";
import { sendOtpEmail } from "@/lib/mailer"; // Only OTP email here
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (await User.findOne({ email })) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Generate a 6-digit OTP and hash it
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save OTP to DB
    await Otp.create({ email, otp: hashedOtp });

    // Send the OTP email
    await sendOtpEmail(email, otp);

    // ✅ Do not send welcome email here
    // ✅ Do not create user here
    // These actions should happen **after OTP is verified**

    return NextResponse.json({ message: "OTP sent successfully." });
  } catch (err) {
    console.error("❌ Error in generate-otp:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
