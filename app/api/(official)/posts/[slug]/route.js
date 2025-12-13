import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";

// ============================
// GET SINGLE POST (PUBLIC / ADMIN)
// ============================
export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const post = await Post.findOne({ slug: params.slug });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("GET POST ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch post",
      },
      { status: 500 }
    );
  }
}

// ============================
// UPDATE POST (ADMIN)
// ============================
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const updatedPost = await Post.findOneAndUpdate(
      { slug: params.slug },
      body,
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update post",
      },
      { status: 500 }
    );
  }
}

// ============================
// DELETE POST (ADMIN)
// ============================
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();

    const deleted = await Post.findOneAndDelete({
      slug: params.slug,
    });

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete post",
      },
      { status: 500 }
    );
  }
}
