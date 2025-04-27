import Link from "next/link";
import CollegeCardForHome from "@/components/custom/CollegeCardForHome";
import HomeHero from "@/components/custom/HomeHero";
import Image from "next/image";
import SmallCardOfInsights from "@/components/custom/SmallCardOfInsights";

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
      href: "/insights",
      label: "Insights",
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ljHw5E36UIMToNEUtAFpJSn_88U7PO8WyQ&s",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <HomeHero />

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
                  alt="College & Exam Images"
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
          <div className="flex justify-between items-center md:mb-6 mb-4">
            <h2 className="text-2xl font-semibold underline decoration-sky-500/30 hover:decoration-sky-500">
              Latest Insights
            </h2>
            <Link href="/insights" className="text-blue-600 hover:underline">
              View Insights
            </Link>
          </div>
          <SmallCardOfInsights />
        </div>
      </section>

      {/* Popular Colleges */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center md:mb-6 mb-4">
            <h2 className="text-2xl font-semibold underline decoration-sky-500/30 hover:decoration-sky-500">
              Popular Colleges
            </h2>
            <Link href="/colleges" className="text-blue-600 hover:underline">
              View Colleges
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
            <div>
              {[
                {
                  quote:
                    "College Finder helped me compare IITs, track JEE updates, and even find a scholarship I did not know existed!",
                  name: "Nilesh Kumar",
                  detail: "B.Tech Student",
                },
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
