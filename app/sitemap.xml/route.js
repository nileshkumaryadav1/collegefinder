// app/sitemap.xml/route.js

export async function GET() {
  const baseUrl = 'https://collegefinder.site'; // ✅ Use your custom domain

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>${baseUrl}/sitemap-colleges.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${baseUrl}/sitemap-exams.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${baseUrl}/sitemap-scholarships.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${baseUrl}/sitemap-news.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
  </sitemapindex>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
