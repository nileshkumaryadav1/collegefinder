"use client";

import ExamsPage from "./exams/page";
import CollegesPage from "./colleges/page";
import AboutUs from "./about/page";
import HomeHero from "@/components/custom/HomeHero";
import FnQ from "@/components/custom/FnQ";
import ScholarshipCard from "@/components/custom/ScholarshipCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <HomeHero />

      {/* Featured Colleges */}
      <CollegesPage />

      {/* Popular Exams */}
      <ExamsPage />

      {/* Scholarships */}
      <h2 className="text-3xl font-bold text-center mt-10">Scholarships</h2>
      <ScholarshipCard />

      {/* F&Q Section */}
      <FnQ />

      {/* About Us */}
      <AboutUs />
    </div>
  );
}
