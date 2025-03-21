"use client";

import { useState, useEffect } from "react";
import Loading from "./Loading";

export default function ScholarshipCard() {
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

  return (
    <div className="mt-6 max-w-4xl mx-auto">
      {scholarships.length === 0 ? (
        <Loading />
      ) : (
        scholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="flex justify-between bg-gray-800 p-4 rounded shadow mb-3"
          >
            <div>
              <h3 className="text-lg text-gray-100 font-bold">
                {scholarship.name} - ₹{scholarship.amount}
              </h3>
              <p className="text-gray-400">{scholarship.about}</p>
              <p className="text-green-400">
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
                Official Link
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
