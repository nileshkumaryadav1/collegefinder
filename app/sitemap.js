export default async function sitemap() {
  const res = await fetch(`https://collegefinder.site/api/colleges`);
  const colleges = await res.json();

  const collegeUrls = colleges.map((college) => ({
    url: `https://collegefinder.site/colleges/${college.slug}`,
    lastModified: new Date(),
  }));

  // const exams = await fetch(`https://collegefinder.site/api/exams`);
  // const examsData = await exams.json();

  // const examUrls = examsData.map((exam) => ({
  //   url: `https://collegefinder.site/exams/${exam.slug}`,
  //   // lastModified: new Date(),
  // }));

  // const news = await fetch(
  //   `https://collegefinder.site/api/news`
  // );
  // const newsData = await news.json();

  // const newsUrls = newsData.map((news) => ({
  //   url: `https://collegefinder.site/news/${news.slug}`,
  //   // lastModified: new Date(),
  // }));

  //   const scholarships = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/scholarships`
  //   );
  //   const scholarshipsData = await scholarships.json();

  //   const scholarshipUrls = scholarshipsData.map((scholarship) => ({
  //     url: `https://collegefinder.site/scholarships/${scholarship.slug}`,
  //     // lastModified: new Date(),
  //   }));

  // const insights = await fetch(
  //   `https://collegefinder.site/api/posts?limit=10&skip=0`
  // );
  // const insightsData = await insights.json();

  // const insightsUrls = insightsData.map((insight) => ({
  //   url: `https://collegefinder.site/insights/${insight.slug}`,
  //   // lastModified: new Date(),
  // }));

  const urls = [
    ...collegeUrls,
    // ...examUrls,
    // ...newsUrls,
    // ...scholarshipUrls,
    // ...insightsUrls,
  ];

  return [
    {
      url: "https://collegefinder.site/",
      lastModified: new Date(),
    },
    {
      url: "https://collegefinder.site/colleges",
      //   lastModified: new Date(),
    },
    {
      url: "https://collegefinder.site/exams",
      //   lastModified: new Date(),
    },
    {
      url: "https://collegefinder.site/scholarships",
      //   lastModified: new Date(),
    },
    {
      url: "https://collegefinder.site/insights",
      //   lastModified: new Date(),
    },
    {
      url: "https://collegefinder.site/about",
      //   lastModified: new Date(),
    },
    {
      url: "https://collegefinder.site/privacy",
      //   lastModified: new Date(),
    },
    {
      url: "https://collegefinder.site/terms",
      //   lastModified: new Date(),
    },
    {
      url: "https://collegefinder.site/news",
      //   lastModified: new Date(),
    },
    ...urls,
  ];
}
