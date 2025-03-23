// import { NextResponse } from "next/server";
// import User from "@/models/User";
// import { connectToDatabase } from "@/lib/mongodb";

// export async function POST(req) {
//   try {
//     await connectToDatabase();
//     const { userId, itemId, type } = await req.json();

//     if (!userId || !itemId || !type) {
//       return NextResponse.json({ success: false, message: "Missing required data!" });
//     }

//     const validTypes = ["likedColleges", "likedExams", "likedScholarships"];
//     if (!validTypes.includes(type)) {
//       return NextResponse.json({ success: false, message: "Invalid like type!" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found!" });
//     }

//     // Toggle Like
//     const index = user[type].indexOf(itemId);
//     if (index === -1) {
//       user[type].push(itemId);
//     } else {
//       user[type].splice(index, 1);
//     }

//     await user.save();
//     return NextResponse.json({ success: true, message: "Like status updated!", likedItems: user[type] });
//   } catch (error) {
//     console.error("Error in liking:", error);
//     return NextResponse.json({ success: false, message: "Failed to update like status!" });
//   }
// }

import { NextResponse } from "next/server";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  await connectToDatabase();
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { itemId, itemType } = await req.json();
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Check if the item is already liked
  const existingLikeIndex = user.likes.findIndex(
    (like) => like.itemId.toString() === itemId && like.itemType === itemType
  );

  if (existingLikeIndex > -1) {
    // Unlike if already liked
    user.likes.splice(existingLikeIndex, 1);
  } else {
    // Add to liked items
    user.likes.push({ itemId, itemType });
  }

  await user.save();
  return NextResponse.json({ message: "Like status updated", likes: user.likes });
}
