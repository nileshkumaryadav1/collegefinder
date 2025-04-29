"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ScholarshipCard from "@/components/custom/ScholarshipCard";

export default function MasterScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [level, setLevel] = useState("postgraduate");

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredScholarships(scholarships);
    } else {
      const filtered = scholarships.filter(
        (scholarship) =>
          scholarship.name.toLowerCase().includes(query.toLowerCase()) ||
          scholarship.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredScholarships(filtered);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Masters Scholarships in India
        </h1>
        <p className="text-gray-500 text-lg">
          Discover scholarships for postgraduate and masters level students.
        </p>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search master's scholarships..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-2/3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Scholarship card */}
      <ScholarshipCard query={searchQuery} />

      {/* Promo Section */}
      <div className="bg-yellow-500 text-black text-center py-4 mt-10 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">
          Secure Funding for Your Masters!
        </h2>
        <p className="text-sm mt-2 mb-4">
          Browse top masters scholarships and apply before deadlines close.
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
