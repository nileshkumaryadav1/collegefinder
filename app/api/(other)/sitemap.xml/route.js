
import { MongoClient } from "mongodb";

// MongoDB URI and database name
const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "test-1";  // Replace with your actual database name

// MongoDB connection function
async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);  // Return the database instance
}

export async function GET(req) {
  try {
    // Get the database connection
    const db = await connectToDatabase();

    // Fetch data from MongoDB collections
    const colleges = await db.collection("colleges").find().toArray();
    const exams = await db.collection("exams").find().toArray();
    const scholarships = await db.collection("scholarships").find().toArray();

    // Prepare pages for the sitemap
    const pages = [
      { loc: "https://collegefinder.vercel.app/", priority: 1.0 },
      { loc: "https://collegefinder.vercel.app/colleges", priority: 0.8 },
      { loc: "https://collegefinder.vercel.app/exams", priority: 0.8 },
      { loc: "https://collegefinder.vercel.app/scholarships", priority: 0.8 },
      ...colleges.map((college) => ({
        loc: `https://collegefinder.vercel.app/colleges/${college.slug}`,
        priority: 0.7,
      })),
      ...exams.map((exam) => ({
        loc: `https://collegefinder.vercel.app/exams/${exam.slug}`,
        priority: 0.7,
      })),
      ...scholarships.map((scholarship) => ({
        loc: `https://collegefinder.vercel.app/scholarships/${scholarship.slug}`,
        priority: 0.7,
      })),
    ];

    // Generate the XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) =>
            `<url><loc>${page.loc}</loc><priority>${page.priority}</priority></url>`
        )
        .join("\n")}
    </urlset>`;

    // Set the response header and return the sitemap XML
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate sitemap" }),
      { status: 500 }
    );
  }
}
