"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function CollegeCard({ query, collegeType, sortBy, sortOrder }) {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(data.colleges);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
      setLoading(false);
    };

    fetchColleges();
  }, []);

  const filteredColleges = colleges
    .filter((college) => {
      const q = query.toLowerCase();

      const matchesQuery =
        college.name?.toLowerCase().includes(q) ||
        college.location?.toLowerCase().includes(q) ||
        college.type?.toLowerCase().includes(q) ||
        college.description?.toLowerCase().includes(q) ||
        college.courses?.toLowerCase().includes(q);

      const matchesType = collegeType
        ? college.type?.toLowerCase().includes(collegeType.toLowerCase())
        : true;

      return matchesQuery && matchesType;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      let valA = a[sortBy];
      let valB = b[sortBy];

      if (valA == null || valB == null) return 0;

      if (typeof valA === "string" && typeof valB === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      return 0;
    });

  return (
    <section>
      <div className="text-center text-lg font-medium bg-[var(--background)] text-[var(--foreground)] mb-2">
        <p>Total Colleges: {filteredColleges.length}</p>
      </div>

      {loading && <p className="text-center p-10">Loading Colleges...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => (
          <Link
            key={college.slug}
            href={`/colleges/${college.slug}`}
            className="block bg-[var(--background)] text-[var(--foreground)] border rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 p-4 relative"
          >
            {/* Featured Ribbon */}
            {college.nirfRanking && college.nirfRanking <= 100 && (
              <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded shadow">
                ⭐ Featured
              </div>
            )}

            {/* Logo & Rank */}
            <div className="flex items-center justify-between mb-4">
              <Image
                src={college.logoUrl}
                alt="College logo"
                width={50}
                height={50}
                className="w-16 h-16 object-contain rounded"
              />
              {college.nirfRanking && (
                <span className="text-sm font-medium text-gray-600 border border-blue-500 text-blue-600 px-2 py-1 rounded-full">
                  #{college.nirfRanking}
                </span>
              )}
            </div>

            {/* Cover Image */}
            <div className="overflow-hidden rounded-md mb-4">
              <Image
                src={college.imageUrl}
                alt="Engineering College Image"
                width={500}
                height={500}
                className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Name & Location */}
            <h2 className="text-xl font-bold mb-1 hover:text-blue-700 transition">
              {college.name}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{college.location}</p>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {college.description
                ? college.description.slice(0, 100) + "..."
                : "No description available."}
            </p>

            {/* Tags & Button */}
            <div className="mt-2 text-xs font-medium flex justify-between">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {college.type}
              </span>
              <span className="bg-blue-600 text-white text-sm px-4 py-1 rounded-md">
                View Details
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CollegeCard;
