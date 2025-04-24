import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import College from "@/models/College"; // Import your model (e.g., College, Exam, etc.)

const BASE_URL = "https://collegefinder.site"; // Replace with your actual base URL

export async function GET() {
  // Connect to MongoDB database
  await connectToDatabase();

  try {
    // Fetch all colleges (you can add other collections here like exams, scholarships, etc.)
    const colleges = await College.find();

    // Static routes (e.g., static pages that don't change)
    const staticRoutes = [
      "",
      "/about",
      "/contact",
      "/colleges",
      "/exams",
      "/scholarships",
      "/news",
    ];

    // Dynamically generate routes for each college
    const dynamicRoutes = colleges.map((college) => `/colleges/${college.slug}`);

    // Combine static and dynamic routes
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    // Construct the sitemap XML content
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
    <url>
      <loc>${BASE_URL}${route}</loc>
      <changefreq>weekly</changefreq>
      <priority>${route === "/" ? "1.0" : "0.8"}</priority>
    </url>`
    )
    .join("")}
</urlset>`.trim();

    // Return the sitemap with the correct content type
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml", // Specify XML content type for proper rendering
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
