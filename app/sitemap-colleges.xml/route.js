// app/sitemap-colleges.xml/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import College from "@/models/College";

export async function GET() {
  await connectToDatabase();
  const colleges = await College.find({}, "slug updatedAt");

  const baseUrl = "https://collegefinder.vercel.app";

  const urls = colleges.map((college) => {
    return `
      <url>
        <loc>${baseUrl}/college/${college.slug}</loc>
        <lastmod>${college.updatedAt.toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
      </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("\n")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
