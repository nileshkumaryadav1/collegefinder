"use client";

import CollegeCard from "@/components/custom/CollegeCard";
import Link from "next/link";
import { useState } from "react";

export default function CollegesPage() {
  const [query, setQuery] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const collegeTypes = [
    "Public",
    "Private",
    "Deemed University",
    "State Government",
    "Central Government",
    "Public-private partnership",
  ];

  const sortFields = [
    { label: "Name", value: "name" },
    { label: "Nirf Ranking", value: "nirfRanking" },
    // { label: "Total Fees", value: "otherFees" },
    // { label: "Placement", value: "averagePlacement" },
  ];

  const sortOrders = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:py-8 py-4 md:px-10 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-2">
        Find Your College
      </h1>
      <p className="text-center text-gray-500 mb-4 max-w-2xl mx-auto">
        Explore detailed information about top engineering colleges in India by
        filtering through institute types, placement stats, fees, and more.
      </p>

      {/* Filters Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 mb-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Filter Colleges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by college name, location, or type ..."
            className="p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition"
          />

          <select
            value={collegeType}
            onChange={(e) => setCollegeType(e.target.value)}
            className="p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition cursor-pointer"
          >
            <option value="">All College Types</option>
            {collegeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 w-1/2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition"
            >
              <option value="">Sort By</option>
              {sortFields.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-3 w-1/2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition"
            >
              {sortOrders.map((order) => (
                <option key={order.value} value={order.value}>
                  {order.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Colleges Display Section */}
      <div className="">
        <CollegeCard
          query={query}
          collegeType={collegeType}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </div>

      {/* Promotion and Monetization Section */}
      <div className="bg-blue-500 text-white p-6 rounded-xl mt-8">
        <h3 className="text-2xl font-semibold mb-4">
          Promote Your College or Service
        </h3>
        <p className="text-lg mb-4">
          Get your college featured on our platform to reach thousands of
          students across India. Special discounts available for early
          promoters!
        </p>
        <Link
          href="/sponsors"
          className="bg-white text-blue-500 font-semibold px-6 py-2 rounded-lg inline-block hover:bg-gray-100 transition"
        >
          Learn More & Promote Now
        </Link>
      </div>
    </div>
  );
}
