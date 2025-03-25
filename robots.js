// public/robots.txt (Enhanced Robots Instructions for Search Engines)
export default function handler(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.send(`User-agent: *
  Allow: /
  Disallow: /admin
  Sitemap: https://collegefinder.vercel.app/sitemap.xml`);
  }