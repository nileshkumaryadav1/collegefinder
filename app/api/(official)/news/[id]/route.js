import { NextResponse } from "next/server";
import News from "@/models/News";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req, { params }) {
  await connectToDatabase();

  const { id } = params;

  try {
    const newsItem = await News.findById(id);

    if (!newsItem) {
      return NextResponse.json({ success: false, message: "News not found" }, { status: 404 });
    }

    return NextResponse.json(newsItem);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching news item" }, { status: 500 });
  }
}
