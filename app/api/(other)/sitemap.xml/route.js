// pages/sitemap.xml.ts (Generating Dynamic Sitemap for All Pages)
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb"; // Assuming you have a database connection

export default async function handler(req, res) {
  const colleges = await connectToDatabase.collection("colleges").find().toArray();
  const exams = await connectToDatabase.collection("exams").find().toArray();
  const scholarships = await connectToDatabase.collection("scholarships").find().toArray();

  const pages = [
    { loc: "https://collegefinder.vercel.app/", priority: 1.0 },
    { loc: "https://collegefinder.vercel.app/colleges", priority: 0.8 },
    { loc: "https://collegefinder.vercel.app/exams", priority: 0.8 },
    { loc: "https://collegefinder.vercel.app/scholarships", priority: 0.8 },
    ...colleges.map(college => ({ loc: `https://collegefinder.vercel.app/colleges/${college.slug}`, priority: 0.7 })),
    ...exams.map(exam => ({ loc: `https://collegefinder.vercel.app/exams/${exam.slug}`, priority: 0.7 })),
    ...scholarships.map(scholarship => ({ loc: `https://collegefinder.vercel.app/scholarships/${scholarship.slug}`, priority: 0.7 }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => `<url><loc>${page.loc}</loc><priority>${page.priority}</priority></url>`).join("\n")}
  </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}