import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { userId, itemId, type } = await req.json();

    if (!userId || !itemId || !type) {
      return NextResponse.json({ success: false, message: "Missing required data!" });
    }

    const validTypes = ["likedColleges", "likedExams", "likedScholarships"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ success: false, message: "Invalid like type!" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found!" });
    }

    // Toggle Like
    const index = user[type].indexOf(itemId);
    if (index === -1) {
      user[type].push(itemId);
    } else {
      user[type].splice(index, 1);
    }

    await user.save();
    return NextResponse.json({ success: true, message: "Like status updated!", likedItems: user[type] });
  } catch (error) {
    console.error("Error in liking:", error);
    return NextResponse.json({ success: false, message: "Failed to update like status!" });
  }
}
