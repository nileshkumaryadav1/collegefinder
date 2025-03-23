"use client";

import AboutUs from "./about/page";
import HomeHero from "@/components/custom/HomeHero";
import FnQ from "@/components/custom/FnQ";
import CollegeCard from "@/components/custom/CollegeCard";
import ExamCard from "@/components/custom/ExamCard";
import ScholarshipCard from "@/components/custom/ScholarshipCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <HomeHero />

      {/* Featured Colleges */}
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center m-6">
          Featured Colleges
        </h2>
        <CollegeCard query="#" />
      </div>

      {/* Popular Exams */}
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center m-6">Popular Exams</h2>
        <ExamCard query="#" />
      </div>

      {/* Scholarships */}
      <div className="container mx-auto m-10">
        <h2 className="text-3xl font-bold text-center m-6">Scholarships</h2>
        <ScholarshipCard query="#" />
      </div>

      {/* F&Q Section */}
      <FnQ />

      {/* About Us */}
      <AboutUs />
    </div>
  );
}
