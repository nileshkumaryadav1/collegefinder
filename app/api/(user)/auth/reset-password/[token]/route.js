import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req, context) {
  try {
    await connectToDatabase();

    const { token } = await context.params; // ✅ Await context.params
    const { password } = await req.json();

    // Validate password
    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Find user by token and check expiry
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Token invalid or expired" },
        { status: 404 }
      );
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Password reset successful! Redirecting to login page..." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "An error occurred while resetting the password" },
      { status: 500 }
    );
  }
}
