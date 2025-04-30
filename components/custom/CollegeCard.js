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
        setColleges(data);
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
      {/* Total Colleges */}
      <div className="text-center text-lg font-medium text-gray-700 mb-2">
        <p>Total Colleges: {filteredColleges.length}</p>
      </div>
      {loading && <p className="text-center p-10">Loading Colleges...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => (
          <div
            key={college.slug}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col mb-2"
          >
            <div className="flex items-center justify-between mb-4">
              <Image
                src={college.logoUrl}
                alt="College logo"
                width={50}
                height={50}
                className="w-16 h-16 object-contain rounded"
              />
              {college.nirfRanking && (
                <span className="text-sm font-medium text-gray-600 btn btn-primary">
                  #{college.nirfRanking}
                </span>
              )}
            </div>

            <Link href={`/colleges/${college.slug}`}>
              <Image
                src={college.imageUrl}
                alt="Engineering College Image"
                width={500}
                height={500}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            </Link>

            <Link
              href={`/colleges/${college.slug}`}
              aria-label="view full College details"
            >
              <h2 className="text-xl font-bold mb-1">{college.name}</h2>
            </Link>

            <p className="text-gray-600 text-sm mb-2">{college.location}</p>

            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {college.description
                ? college.description?.slice(0, 100) + "..."
                : "No description available."}
            </p>

            <div className="mt-auto flex justify-between items-center">
              {college.websiteUrl && (
                <a
                  href={college.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Visit Website
                </a>
              )}
              <Link
                href={`/colleges/${college.slug}`}
                className="btn btn-primary my-1"
                aria-label="view full College details"
              >
                View full Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CollegeCard;
