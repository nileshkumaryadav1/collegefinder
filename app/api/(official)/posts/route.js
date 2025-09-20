// app/api/(official)/posts/route.js
import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// Helper: slugify title → "My First Blog" => "my-first-blog"
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-"); // spaces & symbols -> "-"
}

// Create a new post
export async function POST(req) {
  try {
    await connectToDatabase();
    let data = await req.json();
    console.log("📥 Incoming data:", data);

    // --- Slug handling ---
    if (!data.slug && data.title) {
      let baseSlug = slugify(data.title);
      let uniqueSlug = baseSlug;
      let counter = 1;

      while (await Post.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      data.slug = uniqueSlug;
    }

    // --- Tags normalization ---
    if (data.tags) {
      if (typeof data.tags === "string") {
        // Allow "college, exam" -> ["college","exam"]
        data.tags = data.tags.split(",").map((t) => t.trim().toLowerCase());
      } else if (!Array.isArray(data.tags)) {
        data.tags = ["college"]; // fallback default
      }
    } else {
      data.tags = ["college"];
    }

    // --- SEO Meta normalization ---
    data.seoMeta = {
      title: data.seoMeta?.title || data.title,
      description: data.seoMeta?.description || data.summary,
      keywords: data.seoMeta?.keywords || [],
      image: data.seoMeta?.image || data.thumbnail || "",
      canonicalUrl: data.seoMeta?.canonicalUrl || "",
      metaRobots: data.seoMeta?.metaRobots || "index, follow",
    };

    const post = await Post.create(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating post:", error);
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
    const featured = searchParams.get("featured");
    const pinned = searchParams.get("pinned");

    const query = {};

    if (tag) query.tags = tag; // works since tags is array, mongo does automatic match
    if (type) query.type = type;
    if (featured) query.featured = featured === "true";
    if (pinned) query.pinned = pinned === "true";
    if (search) query.title = { $regex: search, $options: "i" };

    const posts = await Post.find(query).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts", error: error.message },
      { status: 500 }
    );
  }
}
