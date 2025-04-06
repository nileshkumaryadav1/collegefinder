export async function GET(req) {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://collegefinder.vercel.app/sitemap.xml`;

  return new NextResponse(robots, {
    headers: { "Content-Type": "text/plain" },
  });
}
