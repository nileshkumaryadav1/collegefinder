"use client";

import ExamCard from "@/components/custom/ExamCard";
import Link from "next/link";
import { useState } from "react";

export default function StateWiseExams() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="md:text-4xl text-3xl font-bold text-green-600 mb-2">
          Explore State-wise Entrance Exams
        </h1>
        <p className="text-gray-500 text-lg">
          Stay updated with the latest state-wise entrance exams across India.
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

      {/* Exam Grid */}
      <div className="lg:col-span-3">
        <ExamCard query={query} type="Medical" />
      </div>

      {/* Promotion */}
      <div className="bg-green-100 text-center py-6 mt-10 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-green-700">
          Get Instant Exams Alerts!
        </h2>
        <p className="text-sm mt-2 mb-4 text-gray-700">
          Subscribe now and never miss key updates and deadlines.
        </p>
        <Link
          href="/sponsors"
          className="px-8 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  );
}
