// app/api/reviews/route.js

import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const review = await Review.create(body);
    return new Response(JSON.stringify(review), { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return new Response("Error creating review", { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const collegeId = searchParams.get('collegeId');
    const reviews = await Review.find({ collegeId }).sort({ createdAt: -1 });
    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response("Error fetching reviews", { status: 500 });
  }
}
