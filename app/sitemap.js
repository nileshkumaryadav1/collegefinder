export default async function sitemap() {
  // Helper to safely fetch arrays
  const safeFetch = async (url) => {
    try {
      const res = await fetch(url, { cache: "no-store" });

      if (!res.ok) return [];

      const json = await res.json();

      return Array.isArray(json) ? json : [];
    } catch (err) {
      return [];
    }
  };

  // ======== Fetch all data safely ========
  const colleges = await safeFetch("https://collegefinder.site/api/colleges");
  const exams = await safeFetch("https://collegefinder.site/api/exams");
  const insights = await safeFetch("https://collegefinder.site/api/posts?limit=10&skip=0");

  // ======== Generate URLs ========
  const collegeUrls = colleges.map(college => ({
    url: `https://collegefinder.site/colleges/${college.slug}`,
    lastModified: new Date(),
  }));

  const examUrls = exams.map(exam => ({
    url: `https://collegefinder.site/exams/${exam.slug}`,
    lastModified: new Date(),
  }));

  const insightsUrls = insights.map(post => ({
    url: `https://collegefinder.site/insights/${post.slug}`,
    lastModified: new Date(),
  }));

  const dynamicUrls = [
    ...collegeUrls,
    ...examUrls,
    ...insightsUrls,
  ];

  // ======== Static URLs ========
  const staticUrls = [
    { url: "https://collegefinder.site/", lastModified: new Date() },
    { url: "https://collegefinder.site/colleges", lastModified: new Date() },
    { url: "https://collegefinder.site/exams", lastModified: new Date() },
    { url: "https://collegefinder.site/scholarships", lastModified: new Date() },
    { url: "https://collegefinder.site/insights", lastModified: new Date() },
    { url: "https://collegefinder.site/about", lastModified: new Date() },
    { url: "https://collegefinder.site/privacy", lastModified: new Date() },
    { url: "https://collegefinder.site/terms", lastModified: new Date() },
    { url: "https://collegefinder.site/compare-colleges", lastModified: new Date() },
    { url: "https://collegefinder.site/rank-predictor", lastModified: new Date() },
    { url: "https://collegefinder.site/contact-us", lastModified: new Date() },
  ];

  return [...staticUrls, ...dynamicUrls];
}
