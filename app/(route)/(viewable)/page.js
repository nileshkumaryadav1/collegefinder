"use client";

import AboutUs from "./about/page";
import HomeHero from "@/components/custom/HomeHero";
import FnQ from "@/components/custom/FnQ";
import CollegeCard from "@/components/custom/CollegeCard";
import ExamCard from "@/components/custom/ExamCard";
import ScholarshipCard from "@/components/custom/ScholarshipCard";

export default function Home() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <HomeHero />

      {/* Featured Colleges */}
      <div className="mx-auto p-6 container">
        <h2 className="text-3xl font-bold text-center mb-6">
          Featured Colleges
        </h2>
        <CollegeCard query="#" />
      </div>

      {/* Popular Exams */}
      <div className="mx-auto p-6 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center m-6">Popular Exams</h2>
        <ExamCard query="#" />
      </div>

      {/* Scholarships */}
      <div className="md:container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center m-6">Scholarships</h2>
        <ScholarshipCard query="#" />
      </div>

      {/* F&Q Section */}
      <div className="min-h-screen mx-auto mt-10 bg-gray-900 flex flex-col items-center justify-center">
        <FnQ />
      </div>

      {/* About Us */}
      <AboutUs />
    </div>
  );
}
