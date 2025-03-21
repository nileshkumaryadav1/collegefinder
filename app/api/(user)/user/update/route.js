import { NextResponse } from "next/server";
import User from "@/models/User"; // Import your User model
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectToDatabase(); // Connect to MongoDB
    
    const { userId, name, email, profileImage, bio, instagram, linkedin } = await req.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required!" });
    }

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, profileImage, bio, instagram, linkedin },
      { new: true } // Return updated user
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found!" });
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, message: "Failed to update user!" });
  }
}
