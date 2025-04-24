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
import Image from "next/image";

// export const metadata = {
//   title: "College Finder – Explore Top Colleges in India",
//   description:
//     "Find the best colleges in India with reviews, fees, admissions, placements, and more.",
//   openGraph: {
//     title: "College Finder",
//     description: "Explore colleges in India with College Finder.",
//     url: "https://collegefinder.vercel.app/",
//     siteName: "College Finder",
//     type: "website",
//   },
// };

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
          <h2 className="text-2xl font-semibold mb-8 underline decoration-sky-500/30 hover:decoration-sky-500">
            Start Exploring
          </h2>
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
            <h2 className="text-2xl font-semibold underline decoration-sky-500/30 hover:decoration-sky-500">
              Latest News
            </h2>
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
            <h2 className="text-2xl font-semibold underline decoration-sky-500/30 hover:decoration-sky-500">
              Popular Colleges
            </h2>
            <Link href="/colleges" className="text-blue-600 hover:underline">
              Browse All
            </Link>
          </div>
          <CollegeCardForHome query="#" collegeType="" sortBy="" sortOrder="" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 dark:bg-gray-900 py-12 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center underline decoration-sky-500/30 hover:decoration-sky-500 text-gray-800 dark:text-white">
            What Students Say
          </h2>

          <div className="relative w-full overflow-hidden flex items-center justify-center">
            {/* <div className="flex space-x-4 sm:space-x-6 md:space-x-8 w-max animate-scroll"> */}
            <div>
              {[
                {
                  quote:
                    "College Finder helped me compare IITs, track JEE updates, and even find a scholarship I did not know existed!",
                  name: "Nilesh Kumar",
                  detail: "B.Tech Student",
                },
                // {
                //   quote:
                //     "It is the only platform I trust for entrance updates and reliable college information.",
                //   name: "Ananya Singh",
                //   detail: "Medical Aspirant",
                // },
                // {
                //   quote:
                //     "Beautifully designed and easy to use. Helped me shortlist my dream NIT.",
                //   name: "Rajat Verma",
                //   detail: "JEE Mains Qualified",
                // },
                // {
                //   quote:
                //     "Clean UI, quick filters, and accurate data – everything a student needs.",
                //   name: "Rahul Mehra",
                //   detail: "12th Student",
                // },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-[280px] sm:min-w-[500px] max-w-[500px] dark:bg-gray-800 p-4 sm:p-5 rounded-lg flex flex-col justify-center items-center"
                >
                  <p className="italic text-gray-700 dark:text-gray-300 text-sm mb-2 text-justify">
                    “{testimonial.quote}”
                  </p>
                  <p className="md:mt-1 text-sm text-blue-900 dark:text-white">
                    {testimonial.name} - {""}
                    {testimonial.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement */}
      <section className="md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 underline decoration-sky-500/30 hover:decoration-sky-500 text-gray-800 dark:text-white">
            {/* Sponsored by */}
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl shadow p-4 mx-auto">
            <h4 className="text-md font-bold text-blue-700 mb-2 text-center">
              Advertisement
            </h4>
            <Link href="/sponsors" className="hover:underline md:flex gap-4">
              <Image
                src="/sponsors.jpg"
                alt="Ad Banner"
                width={300}
                height={150}
                className="rounded-lg object-cover mx-auto pb-4 md:pb-0"
              />
              <Image
                src="/sponsors.jpg"
                alt="Ad Banner"
                width={300}
                height={150}
                className="rounded-lg object-cover mx-auto pb-4 md:pb-0 hidden md:block"
              />
              <Image
                src="/sponsors.jpg"
                alt="Ad Banner"
                width={300}
                height={150}
                className="rounded-lg object-cover mx-auto pb-4 md:pb-0 hidden md:block"
              />
            </Link>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Sponsored Content
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-gray-600">
        <p className="text-sm">
          Sponsored by <strong>College Finder</strong> | Helping you achieve
          your career goals.
        </p>
      </footer>
    </main>
  );
}
