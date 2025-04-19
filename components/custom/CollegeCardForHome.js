"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/custom/Loading";

function CollegeCardForHome({ query, collegeType, sortBy, sortOrder }) {
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

  if (loading) return <Loading />;

  // 🧠 Apply filtering
  const filteredColleges = colleges
    .filter((college) => {
      const matchesQuery = college.name
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesType = collegeType ? college.type === collegeType : true;

      return matchesQuery && matchesType;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      let valA = a[sortBy];
      let valB = b[sortBy];

      // If value is string (e.g., name)
      if (typeof valA === "string" && typeof valB === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      // If value is number (e.g., fees, rating, placement)
      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      return 0;
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredColleges.map((college) => (
        <div
          key={college._id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col mb-2"
        >
          <Link href={`/colleges/${college._id}`}>
            <div className="flex items-center justify-between mb-4">
              <img
                src={college.logoUrl}
                alt={`${college.name} logo`}
                className="w-16 h-16 object-contain rounded"
              />
              <span className="text-sm font-medium text-gray-600 btn btn-primary">
                #{college.nirfRanking}
              </span>
            </div>
            <img
              src={college.imageUrl}
              alt={college.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-md font-bold mb-1">{college.name}</h2>
          <p className="text-gray-600 text-sm mb-2">{college.location}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CollegeCardForHome;
