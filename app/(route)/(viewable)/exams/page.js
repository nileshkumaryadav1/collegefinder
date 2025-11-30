"use client";

import ExamCard from "@/components/custom/ExamCard";
import Link from "next/link";
import { useState } from "react";

export default function ExamsPage() {
  const [query, setQuery] = useState("");
  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-[var(--background)] text-[var(--foreground)] text-gray-800">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="md:text-4xl text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Explore Entrance Exams
          </h1>
          <p className="text-gray-500 text-lg">
            Explore <strong>Engineering, Medical, Managements</strong> entrance exams with important{" "}
            <strong>Date, Eligibility</strong> and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search Exams..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-3 py-2 rounded w-full shadow"
          />
        </div>

        {/* Count */}
        <div className="text-center text-lg font-medium text-gray-700 mb-6">
          Total Entrance Exams:
          {/* {filteredExams.length} */}
        </div>

        {/* Exam Grid */}
        <div className="lg:col-span-3">
          <ExamCard query={query} />
        </div>

        {/* Right Column: Sponsored/Promotion Section */}
        <div className="mt-5 border-t rounded">
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Sponsored
            </h2>

            {/* Featured Exam Advertisement */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <h3 className="text-lg font-bold text-blue-600">
                Special Exam Preparation Course
              </h3>
              <p className="text-gray-600 mt-2">
                Prepare for competitive exams with our expert-led courses
                designed for success.
              </p>
              <Link
                href="/sponsors"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Learn More
              </Link>
            </div>

            {/* Apply Now Advertisement */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-bold text-yellow-600">
                Register for the Big Exam 2025
              </h3>
              <p className="text-gray-600 mt-2">
                Don&apos;t miss out! Register now for the biggest exam of the
                year.
              </p>
              <Link
                href="/sponsors"
                className="text-yellow-500 hover:underline mt-2 inline-block"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        {/* Promotion */}
        <div className="bg-blue-100 text-center py-6 mt-10 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-700">
            Stay Ahead with Engineering Exam Alerts!
          </h2>
          <p className="text-sm mt-2 mb-4 text-gray-700">
            Subscribe now and never miss an important date.
          </p>
          <Link
            href="/sponsors"
            className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
          >
            Subscribe Now
          </Link>
        </div>

        {/* Footer Section */}
        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Sponsored by <strong>College Finder</strong> | Helping you achieve
            your career goals.
          </p>
        </footer>
      </div>
    </>
  );
}
