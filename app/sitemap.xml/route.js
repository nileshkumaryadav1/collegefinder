// app/sitemap.xml/route.js
export async function GET() {
    const baseUrl = 'https://collegefinder.vercel.app';
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap><loc>${baseUrl}/sitemap-colleges.xml</loc></sitemap>
      <sitemap><loc>${baseUrl}/sitemap-exams.xml</loc></sitemap>
      <sitemap><loc>${baseUrl}/sitemap-scholarships.xml</loc></sitemap>
      <sitemap><loc>${baseUrl}/sitemap-news.xml</loc></sitemap>
    </sitemapindex>`;
  
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
  