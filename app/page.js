import Link from "next/link";
import CollegeCardForHome from "@/components/custom/CollegeCardForHome";
import HomeHero from "@/components/custom/HomeHero";
import SmallCardOfInsights from "@/components/custom/SmallCardOfInsights";
import SponsorsCard from "@/components/custom/SponsorsCard";
import PopUp from "@/components/ad/PopUp";
import HomeExplore from "@/components/custom/HomeExplore";
import TestimonialSection from "@/components/custom/home/Testimonal";
import FloatingTrendingNewsButton from "@/components/custom/myself/FloatingTrendingNewsButton";

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
      label: "News",
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ljHw5E36UIMToNEUtAFpJSn_88U7PO8WyQ&s",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* <PopUp /> */}

      {/* Floating Button */}
      <FloatingTrendingNewsButton />

      {/* Hero Section */}
      <HomeHero />

      {/* Featured Categories */}
      <HomeExplore exploreData={exploreData} />

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

      {/* Latest News */}
      <section className="md:py-12 py-6 px-4 bg-[var(--background)] text-[var(--foreground)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center md:mb-6 mb-4">
            <h2 className="text-2xl font-semibold underline decoration-sky-500/30 hover:decoration-sky-500">
              Latest Updates
            </h2>
            <Link href="/insights" className="text-blue-600 hover:underline">
              View Updates
            </Link>
          </div>
          <SmallCardOfInsights />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Advertisement */}
      <section className="md:py-12 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold underline decoration-sky-500/30 hover:decoration-sky-500">
              Our Sponsors
            </h2>
            <Link href="/sponsors" className="text-blue-600 hover:underline">
              Sponsor Us
            </Link>
          </div>
          <SponsorsCard />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="mt-12 text-center bg-[var(--background)] text-[var(--foreground)]">
        <p className="text-sm px-2">
          Sponsored by <strong>College Finder</strong> | Helping you achieve
          your career goals.
        </p>
      </footer>
    </main>
  );
}
