// seo.config.js (Reusable SEO Configuration for All Search Engines & Browsers)
export const defaultSEO = {
    title: "College Finder - Find Your Ideal College",
    description: "Search for the best colleges, exams, and scholarships. Compare rankings, fees, and admission details.",
    keywords: "colleges, exams, scholarships, university admission, education portal, college ranking, education search, higher studies",
    openGraph: {
      type: "website",
      url: "https://collegefinder.vercel.app",
      title: "College Finder - Find Your Ideal College",
      description: "Search for the best colleges, exams, and scholarships. Compare rankings, fees, and admission details.",
      image: "https://collegefinder.vercel.app/logo.jpg",
    },
    twitter: {
      card: "summary_large_image",
      site: "@collegefinder",
      title: "College Finder - Find Your Ideal College",
      description: "Find top colleges, exams, and scholarships with ease.",
      image: "https://collegefinder.vercel.app/logo.jpg",
    },
    canonical: "https://collegefinder.vercel.app",
  };
  

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
  
  // Adding hreflang tags dynamically for multilingual SEO support
  export function generateHreflangs(locales) {
    const baseUrl = "https://collegefinder.vercel.app";
    return `
      <link rel="alternate" hreflang="en" href="${baseUrl}/" />
      <link rel="alternate" hreflang="es" href="${baseUrl}/es" />
      <link rel="alternate" hreflang="fr" href="${baseUrl}/fr" />
      <link rel="alternate" hreflang="de" href="${baseUrl}/de" />
    `;
  }
  
  // JSON-LD Structured Data for SEO
  export const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "College Finder",
    "url": "https://collegefinder.vercel.app",
    "description": "Find top colleges, exams, and scholarships with ease.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://collegefinder.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  
  // Optimizing Internal Linking (Example usage in navigation)
  export const internalLinks = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges" },
    { name: "Exams", href: "/exams" },
    { name: "Scholarships", href: "/scholarships" },
  ];
  