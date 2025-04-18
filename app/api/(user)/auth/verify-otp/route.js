import { NextResponse } from "next/server";
import Otp from "@/models/Otp";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { sendWelcomeEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email, otp } = await req.json();

    // Check if email and OTP are provided
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Find the latest OTP record for the user
    const record = await Otp.findOne({ email }).sort({ createdAt: -1 });

    // If no OTP record is found or it has expired
    if (!record) {
      return NextResponse.json(
        { error: "OTP expired or not found" },
        { status: 400 }
      );
    }

    // Compare the provided OTP with the stored hashed OTP
    const valid = await bcrypt.compare(otp, record.otp);
    if (!valid) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Check if the user exists in the database
    let user = await User.findOne({ email });
    if (!user) {
      // If the user doesn't exist, create a new user with default values
      user = await User.create({
        email,
        password: "defaultPassword", // Placeholder password (can be changed later)
        name: "Anonymous User", // Default name (can be updated later)
      });
    }

    // Send the welcome email to the user after OTP verification
    await sendWelcomeEmail(user.email, user.name);

    // Delete the used OTP after verification
    await Otp.deleteMany({ email });

    // Respond with a success message and the user data
    return NextResponse.json({ message: "OTP verified successfully.", user });
  } catch (err) {
    console.error("Error during OTP verification:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
