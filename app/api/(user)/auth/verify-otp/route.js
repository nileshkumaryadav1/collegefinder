import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { connectToDatabase } from "@/lib/mongodb";
import { sendWelcomeEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email, otp } = await req.json();

    // 🔒 Validate input
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required." },
        { status: 400 }
      );
    }

    // 🔍 Get the latest OTP entry
    const latestOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!latestOtp) {
      return NextResponse.json(
        { error: "OTP expired or not found." },
        { status: 400 }
      );
    }

    // 🕒 Optional: Check OTP expiry manually (e.g., 5 minutes validity)
    const otpAgeInMinutes = (Date.now() - new Date(latestOtp.createdAt).getTime()) / 60000;
    if (otpAgeInMinutes > 5) {
      await Otp.deleteMany({ email }); // Clean up
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // ✅ Compare OTP
    const isMatch = await bcrypt.compare(otp, latestOtp.otp);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid OTP." }, { status: 400 });
    }

    // 👤 Check if user exists, else create
    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      user = await User.create({
        email,
        password: "defaultPassword", // placeholder; ideally, enforce update later
        name: "Anonymous User",
      });
      isNewUser = true;
    }

    // ✉️ Send welcome email (only if newly registered)
    if (isNewUser) {
      await sendWelcomeEmail(user.email, user.name);
    }

    // 🧹 Clean up OTPs
    await Otp.deleteMany({ email });

    return NextResponse.json({
      message: "OTP verified successfully.",
      user,
      newUser: isNewUser,
    });
  } catch (err) {
    console.error("❌ OTP Verification Error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
