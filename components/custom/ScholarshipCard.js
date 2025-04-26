"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ScholarshipCard({ query }) {
  const [scholarships, setScholarships] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("/api/scholarships");
        if (!res.ok) throw new Error("Failed to fetch scholarships");
        const data = await res.json();
        setScholarships(data.data || []);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchScholarships();
  }, []);

  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.name?.toLowerCase().includes(query.toLowerCase())
  );

  if (errorMessage) {
    return (
      <p className="text-center text-red-500 mt-10">
        Error: {errorMessage}
      </p>
    );
  }

  if (!scholarships.length) {
    return <p className="text-center mt-10 text-gray-500">Loading scholarships...</p>;
  }

  if (filteredScholarships.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No scholarships match your search.</p>;
  }

  return (
    <div className="mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredScholarships.map((scholarship) => (
        <div
          key={scholarship.slug}
          className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-1">
              {scholarship.name}
            </h3>
            <p className="text-gray-700 text-xs">{scholarship.slug}</p>
            <p className="text-gray-700 mb-2">{scholarship.about}</p>
            <p className="text-sm text-green-600 mb-1">
              Eligibility: {scholarship.eligibility}
            </p>
            <p className="text-sm text-yellow-600 mb-2">
              Deadline: {scholarship.deadline?.slice(0, 10)}
            </p>
            <a
              href={scholarship.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Visit Official Website
            </a>
          </div>

          <Link
            href={`/scholarships/${scholarship.slug}`}
            className="mt-4 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
