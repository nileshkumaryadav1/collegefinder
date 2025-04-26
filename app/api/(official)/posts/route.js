// // POST handler
// import Post from "@/models/Post";

// export async function POST(req) {
//   const data = await req.json();
//   const post = await Post.create(data);
//   return Response.json(post);
// }

// // Supports ?tag=exam&type=news&search=jee
// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const tag = searchParams.get("tag");
//   const type = searchParams.get("type");
//   const search = searchParams.get("search");

//   let query = {};
//   if (tag) query.tags = tag;
//   if (type) query.type = type;
//   if (search) query.title = { $regex: search, $options: "i" };

//   const posts = await Post.find(query).sort({ createdAt: -1 });
//   return Response.json(posts);
// }





import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// Create a new post
export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const post = await Post.create(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create post", error: error.message },
      { status: 500 }
    );
  }
}

// Get posts with optional filtering
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const query = {};
    if (tag) query.tags = tag;
    if (type) query.type = type;
    if (search) query.title = { $regex: search, $options: "i" };

    const posts = await Post.find(query).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch posts", error: error.message },
      { status: 500 }
    );
  }
}
