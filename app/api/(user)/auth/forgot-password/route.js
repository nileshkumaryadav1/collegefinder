import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendResetMail } from "@/lib/mailer";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req) {
  try {
    // 1. Connect to MongoDB
    await connectToDatabase();

    // 2. Parse request body
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // 3. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 4. Generate secure token and expiry
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    // 5. Construct password reset link
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    // 6. Send reset email
    await sendResetMail({
      to: user.email,
      subject: "🔐 Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 24px; border-radius: 8px;">
          <h2 style="color: #0d6efd;">Reset Your Password</h2>
          <p>Hi <strong>${user.name || "User"}</strong>,</p>
          <p>We received a request to reset your password. Click the link below to proceed:</p>
          <p><a href="${resetLink}" style="background-color: #0d6efd; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">Reset Password</a></p>
          <p>If you did not request this, you can safely ignore this email.</p>
          <p style="font-size: 12px; color: #666;">This link will expire in 1 hour.</p>
        </div>
      `,
    });

    // 7. Return success response
    return NextResponse.json({ message: "Reset link sent to your email address!" });

  } catch (error) {
    console.error("❌ Forgot password error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
