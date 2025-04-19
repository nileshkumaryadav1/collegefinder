import { NextResponse } from "next/server";
import News from "@/models/News";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  await connectToDatabase();
  const news = await News.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: news });
}

export async function POST(req) {
  await connectToDatabase();
  const { title, description, category, publishedDate, sourceURL } = await req.json();

  if (!title || !description || !category || !publishedDate || !sourceURL) {
    return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
  }

  const created = await News.create({ title, description, category, publishedDate, sourceURL });
  return NextResponse.json({ success: true, data: created });
}

export async function PUT(req) {
  await connectToDatabase();
  const { id, title, description, category, publishedDate, sourceURL } = await req.json();

  if (!id) {
    return NextResponse.json({ success: false, message: "News ID is required" }, { status: 400 });
  }

  const updated = await News.findByIdAndUpdate(
    id,
    { title, description, category, publishedDate, sourceURL },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ success: false, message: "News not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(req) {
  await connectToDatabase();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ success: false, message: "News ID is required" }, { status: 400 });
  }

  const deleted = await News.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ success: false, message: "News not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "News deleted" });
}
