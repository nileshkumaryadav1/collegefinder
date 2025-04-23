"use client";

import ExamCard from "@/components/custom/ExamCard";
import Link from "next/link";
import { useState } from "react";

export default function ExamsPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="md:text-4xl text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          Explore Engineering Exams
        </h1>
        <p className="text-gray-500 text-lg">
          Explore <strong>Engineering</strong> exams with important <strong>Date, Eligibility</strong> and more.
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
        Total Engineering Exams:
        {/* {filteredExams.length} */}
      </div>

      {/* Exam Grid */}
      <div className="lg:col-span-3">
        <ExamCard query={query} type="engineering" />
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
    </div>
  );
}
