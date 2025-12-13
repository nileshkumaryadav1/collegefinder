import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";

// ============================
// CREATE POST (ADMIN)
// ============================
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const post = await Post.create(body);

    return NextResponse.json(
      {
        success: true,
        data: post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST CREATE ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create post",
      },
      { status: 500 }
    );
  }
}

// ============================
// GET ALL POSTS (ADMIN / PUBLIC)
// ============================
export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const examType = searchParams.get("examType");

    const filter = {};
    if (category) filter.category = category;
    if (examType) filter.examType = examType;

    const posts = await Post.find(filter)
      .sort({ pinned: -1, createdAt: -1 })
      .select(`
        title
        slug
        category
        examType
        hero
        summary.lead
        featured
        pinned
        createdAt
      `);

    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("POST LIST ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch posts",
      },
      { status: 500 }
    );
  }
}
