import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { connectToDatabase } from "@/lib/mongodb"; // Optional if needed

// GET Post by Slug
export async function GET(req, { params }) {
  await connectToDatabase(); // if required
  const { slug } = params;

  try {
    const post = await Post.findOne({ slug });
    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: post });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error fetching post" }, { status: 500 });
  }
}

// DELETE Post by Slug
export async function DELETE(req, { params }) {
  await connectToDatabase(); // if required
  const { slug } = params;

  try {
    await Post.findOneAndDelete({ slug });
    return NextResponse.json({ success: true, message: "Post deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error deleting post" }, { status: 500 });
  }
}

// PUT (Update) Post by Slug
export async function PUT(req, { params }) {
  await connectToDatabase(); // if required
  const { slug } = params;
  const data = await req.json();

  try {
    const updatedPost = await Post.findOneAndUpdate({ slug }, data, { new: true });

    if (!updatedPost) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedPost });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error updating post" }, { status: 500 });
  }
}
