import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { connectToDatabase } from "@/lib/mongodb";
import { sendWelcomeEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email, otp, name, password } = await req.json();

    // 🔒 Validate input
    if (!email || !otp || !name || !password) {
      return NextResponse.json(
        { error: "Email, OTP, name, and password are required." },
        { status: 400 }
      );
    }

    // 🔍 Get latest OTP for email
    const latestOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!latestOtp) {
      return NextResponse.json(
        { error: "OTP not found or has expired." },
        { status: 400 }
      );
    }

    // ⏳ Check if OTP expired (valid for 5 minutes)
    const otpAgeMinutes = (Date.now() - new Date(latestOtp.createdAt).getTime()) / 60000;
    if (otpAgeMinutes > 5) {
      await Otp.deleteMany({ email });
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // ✅ Match OTP
    const isOtpValid = await bcrypt.compare(otp, latestOtp.otp);
    if (!isOtpValid) {
      return NextResponse.json({ error: "Invalid OTP not matched." }, { status: 400 });
    }

    // 👤 Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists with this email." },
        { status: 400 }
      );
    }

    // 🔐 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Create user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✉️ Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    // 🧹 Clean up OTP
    await Otp.deleteMany({ email });

    return NextResponse.json({
      message: "User registered successfully ✅",
      userId: user._id,
    });
  } catch (err) {
    console.error("❌ OTP Verification Error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
