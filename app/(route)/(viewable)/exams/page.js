"use client";

import ExamCard from "@/components/custom/ExamCard";
import { useState } from "react";

export default function ExamsPage() {
  const [query, setQuery] = useState("");
  return (
    <div className="md:px-20 bg-gray-100 mx-auto p-6">
      {/* Main Title */}
      <h1 className="md:text-4xl text-3xl dark:text-white font-bold text-center md:mb-8 mb-4 text-gray-800">
        Explore Upcoming Exams
      </h1>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search exams..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 w-full md:w-1/2 lg:w-1/3 border bg-white dark:bg-gray-800 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
      </div>

      {/* Main Content Section: Exams & Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Exams List */}
        <div className="lg:col-span-3">
          <ExamCard query={query} />
        </div>

        {/* Right Column: Sponsored/Promotion Section */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sponsored</h2>
            
            {/* Featured Exam Advertisement */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <h3 className="text-lg font-bold text-blue-600">Special Exam Preparation Course</h3>
              <p className="text-gray-600 mt-2">
                Prepare for competitive exams with our expert-led courses designed for success.
              </p>
              <a
                href="#"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Learn More
              </a>
            </div>

            {/* Apply Now Advertisement */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-bold text-yellow-600">Register for the Big Exam 2025</h3>
              <p className="text-gray-600 mt-2">
                Don&apos;t miss out! Register now for the biggest exam of the year.
              </p>
              <a
                href="#"
                className="text-yellow-500 hover:underline mt-2 inline-block"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-gray-600">
        <p className="text-sm">
          Sponsored by <strong>EduTech Solutions</strong> | Helping you achieve your career goals.
        </p>
      </footer>
    </div>
  );
}
