"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ScholarshipCard({ query, level }) {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("/api/scholarships");
        if (!res.ok) throw new Error("Failed to fetch scholarships");
        const data = await res.json();
        setScholarships(data.data || []);
      } catch (error) {
        setErrorMessage(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.name?.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">
        Error: {errorMessage}
      </p>
    );
  }

  if (filteredScholarships.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No scholarships match your search.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Count */}
      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        Total Scholarships: {filteredScholarships.length}
      </div>
      <div className="mt-8 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredScholarships.map((scholarship) => (
          <div
            key={scholarship.slug}
            className="bg-[var(--background)] text-[var(--foreground)] border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">
                {scholarship.name || "Unnamed Scholarship"}
              </h3>

              {scholarship.level && (
                <p className="text-sm text-gray-600 mb-2">
                  Level: {scholarship.level}
                </p>
              )}

              {scholarship.about && (
                <p className="text-gray-700 text-sm mb-3">
                  {scholarship.about}
                </p>
              )}

              {scholarship.eligibility && (
                <p className="text-sm text-green-600 mb-2">
                  <span className="font-semibold">Eligibility:</span>{" "}
                  {scholarship.eligibility}
                </p>
              )}

              {scholarship.deadline && (
                <p className="text-sm text-yellow-600 mb-2">
                  <span className="font-semibold">Deadline:</span>{" "}
                  {scholarship.deadline.slice(0, 10)}
                </p>
              )}

              {scholarship.officialLink && (
                <a
                  href={scholarship.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 hover:underline text-sm mt-1"
                >
                  Visit Official Website
                </a>
              )}
            </div>

            <Link
              href={`/scholarships/${scholarship.slug}`}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
