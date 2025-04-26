"use client";

import ScholarshipCard from "@/components/custom/ScholarshipCard";
import Link from "next/link";
import { useState } from "react";

export default function Scholarships() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-white p-6 md:px-16 lg:px-32">
      <h1 className="text-4xl font-semibold text-blue-600 dark:text-blue-400 text-center">
        Explore Scholarships
      </h1>

      <p className="text-gray-500 text-lg text-center mb-8">
        Find a <strong>Scholarship</strong> that fits your needs and apply to it
        now!
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Search & Scholarships */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search scholarships..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          {/* Displaying the Scholarship Cards */}
          <ScholarshipCard query={query} />
        </div>

        {/* Right Column: Promotions / Advertisement */}
        <div className="">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Sponsored
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="text-lg font-bold text-blue-600">
                Featured Scholarship
              </h3>
              <p className="text-gray-600 mt-2">
                Check out this exclusive scholarship opportunity for students in
                the tech field.
              </p>
              <Link
                href="/sponsors"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Learn More
              </Link>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-bold text-yellow-600">
                Apply Now for a Full Scholarship
              </h3>
              <p className="text-gray-600 mt-2">
                Do not miss out on the chance to apply for this amazing
                scholarship with a full tuition fee cover!
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
      </div>
    </div>
  );
}
