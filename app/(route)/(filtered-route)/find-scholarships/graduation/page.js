"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function GraduationScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/scholarships");
        const data = await res.json();

        const graduationOnly = data.filter((item) =>
          item.level?.toLowerCase().includes("graduation")
        );

        setScholarships(graduationOnly);
        setFilteredScholarships(graduationOnly);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredScholarships(scholarships);
    } else {
      const filtered = scholarships.filter((scholarship) =>
        scholarship.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredScholarships(filtered);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Graduation Scholarships in India
        </h1>
        <p className="text-gray-500 text-lg">
          Find the best scholarships for undergraduate/graduation-level students.
        </p>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search scholarships..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-2/3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Count */}
      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        Total Scholarships: {filteredScholarships.length}
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.map((item) => (
          <Link key={item._id} href={`/scholarships/${item._id}`}>
            <div className="border rounded-lg shadow hover:shadow-lg p-6 cursor-pointer transition-transform hover:scale-105">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-1">{item.description?.slice(0, 100)}...</p>
              <p className="text-sm text-gray-500">Level: {item.level}</p>
              <p className="text-sm text-gray-500">Deadline: {item.deadline || "N/A"}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Promo Section */}
      <div className="bg-yellow-500 text-black text-center py-4 mt-10 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Do not Miss Out on Graduation Funding!</h2>
        <p className="text-sm mt-2 mb-4">
          Apply now for the best graduation-level scholarships across India.
        </p>
        <Link
          href="/sponsors"
          className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}
