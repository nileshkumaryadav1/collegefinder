// "use client";

// import AboutUs from "./about/page";
// import HomeHero from "@/components/custom/HomeHero";
// import FnQ from "@/components/custom/FnQ";
// import CollegeCard from "@/components/custom/CollegeCard";
// import ExamCard from "@/components/custom/ExamCard";
// import ScholarshipCard from "@/components/custom/ScholarshipCard";

// export default function Home() {
//   return (
//     <div className="bg-gray-100 dark:bg-gray-900">
//       {/* Hero Section */}
//       <HomeHero />

//       {/* Featured Colleges */}
//       <div className="mx-auto p-6 container">
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Featured Colleges
//         </h2>
//         <CollegeCard query="#" />
//       </div>

//       {/* Popular Exams */}
//       <div className="mx-auto p-6 flex flex-col items-center justify-center">
//         <h2 className="text-3xl font-bold text-center m-6">Popular Exams</h2>
//         <ExamCard query="#" />
//       </div>

//       {/* Scholarships */}
//       <div className="md:container mx-auto p-6">
//         <h2 className="text-3xl font-bold text-center m-6">Scholarships</h2>
//         <ScholarshipCard query="#" />
//       </div>

//       {/* F&Q Section */}
//       <div className="flex flex-col items-center justify-center">
//         <FnQ />
//       </div>

//       {/* About Us */}
//       <AboutUs />
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import CollegeCardForHome from "@/components/custom/CollegeCardForHome";
import NewsCardForHome from "@/components/custom/NewsCardForHome";
import HomeHero from "@/components/custom/HomeHero";

export default function Home() {
  const exploreData = [
    {
      i: 1,
      href: "/colleges",
      label: "Colleges",
      link: "https://cle.iitb.ac.in/wp-content/uploads/2021/10/IIT-Mumbai-1.jpg",
    },
    {
      i: 2,
      href: "/exams",
      label: "Exams",
      link: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhhbXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      i: 3,
      href: "/scholarships",
      label: "Scholarships",
      link: "https://thumbs.dreamstime.com/b/scholarship-image-shows-word-graduation-cap-placed-hardcover-book-318072918.jpg",
    },
    {
      i: 4,
      href: "/news",
      label: "News",
      link: "https://d27p2a3djqwgnt.cloudfront.net/wp-content/uploads/2017/04/20050020/newspapers-444448_1280.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <HomeHero />
      {/* <section className="bg-blue-50 dark:bg-gray-900 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover Top Colleges, Exams, Scholarships & More
        </h1>
        <p className="max-w-xl mx-auto mb-6 text-gray-600 dark:text-gray-400">
          Explore the latest and most accurate info to plan your academic
          future.
        </p>
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search colleges, exams, scholarships..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section> */}

      {/* Featured Categories */}
      <section className="md:py-12 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 underline decoration-sky-500/30 hover:decoration-sky-500">Start Exploring</h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {exploreData.map((i) => (
              <Link
                key={i}
                href={i.href}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition p-4"
              >
                <img
                  src={i.link}
                  alt={i.label}
                  className="rounded-md mb-3 h-32 w-full object-cover"
                />
                <h3 className="text-lg font-medium">{i.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="md:py-12 py-6 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center md:mb-6">
            <h2 className="text-2xl font-semibold underline decoration-sky-500/30 hover:decoration-sky-500">Latest News</h2>
            <Link href="/news" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <NewsCardForHome category="Important" />
        </div>
      </section>

      {/* Popular Colleges */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold underline decoration-sky-500/30 hover:decoration-sky-500">Popular Colleges</h2>
            <Link href="/colleges" className="text-blue-600 hover:underline">
              Browse All
            </Link>
          </div>
          <CollegeCardForHome query="#" collegeType="" sortBy="" sortOrder="" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6 underline decoration-sky-500/30 hover:decoration-sky-500">What Students Say</h2>
          <blockquote className="italic">
            “College Finder helped me compare IITs, track JEE updates, and even
            find a scholarship I did not know existed!”
          </blockquote>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Nilesh Kumar, B.Tech Student
          </p>
        </div>
      </section>
    </main>
  );
}
