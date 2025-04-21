"use client";

import { useState, useEffect } from "react";
import Loading from "./Loading";
import Link from "next/link";

export default function ScholarshipCard({ query }) {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetchScholarships();
  }, []);

  async function fetchScholarships() {
    try {
      const res = await fetch("/api/scholarships");
      if (!res.ok) throw new Error("Failed to fetch scholarships");
      const data = await res.json();
      setScholarships(data.data); // Fix: Use `data.data`
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (scholarships.length === 0) {
    return <p className="text-center p-30">Loading...</p>;
  }

  return (
    <div className="mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {scholarships.length === 0 ? (
        <p className="text-center mt-10">No scholarships found.</p>
      ) : (
        scholarships
          .filter((scholarships) => {
            return scholarships.name
              .toLowerCase()
              .includes(query.toLowerCase());
          })
          .map((scholarship) => (
            <div
              key={scholarship._id}
              className="p-4 bg-white rounded border border-gray-300 shadow-xl mb-3"
            >
              <div>
                <h3 className="text-lg font-bold">
                  {scholarship.name} - ₹{scholarship.amount}
                </h3>
                <p className="text-gray-800">{scholarship.about}</p>
                <p className="text-green-500">
                  Eligibility: {scholarship.eligibility}
                </p>
                <p className="text-yellow-400">
                  Deadline: {scholarship.deadline}
                </p>
                <a
                  href={scholarship.officialLink}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official Website
                </a>
              </div>
              <Link
                className="bg-blue-500 text-white px-2 py-2 rounded mt-2 inline-block w-3/3 text-center"
                href={`/scholarships/${scholarship._id}`}
              >
                View Details
              </Link>
            </div>
          ))
      )}
    </div>
  );
}
