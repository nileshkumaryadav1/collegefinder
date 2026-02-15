"use client";

import CollegeCard from "@/components/custom/CollegeCard";
import Link from "next/link";
import { useState } from "react";

export default function CollegesPage() {
  const defaultFilters = {
    query: "",
    type: "",
    state: "",
    city: "",
    program: "",
    specialization: "",
    minFees: "",
    maxFees: "",
    minPackage: "",
    maxPackage: "",
    nirfMin: "",
    nirfMax: "",
    rating: "",
    hostelBoys: false,
    hostelGirls: false,
    scholarshipAvailable: false,
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setSortBy("");
    setSortOrder("asc");
  };

  const sortFields = [
    { label: "Name", value: "name" },
    { label: "NIRF Ranking", value: "nirfRanking" },
    { label: "Highest Package", value: "placements.BTech.highest" },
    { label: "Average Package", value: "placements.BTech.average" },
    { label: "Total Fees", value: "fees.total" },
    { label: "Rating", value: "rating" },
    { label: "Most Viewed", value: "views" },
    { label: "Most Liked", value: "likes" },
    { label: "Newest", value: "createdAt" },
    { label: "Recently Updated", value: "updatedAt" },
  ];

  /* ================= FILTER UI ================= */

  const FilterUI = () => (
    <div className="bg-white border shadow-lg rounded-2xl p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Advanced Filters
        </h2>
        <button
          onClick={clearFilters}
          className="text-sm text-red-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* FILTER GRID */}
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="🔍 Search college..."
          value={filters.query}
          onChange={(e) => updateFilter("query", e.target.value)}
          className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <select
          value={filters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Types</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Deemed">Deemed</option>
          <option value="Autonomous">Autonomous</option>
        </select>

        <select
          value={filters.program}
          onChange={(e) => updateFilter("program", e.target.value)}
          className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Programs</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
        </select>

        <input
          type="text"
          placeholder="State"
          value={filters.state}
          onChange={(e) => updateFilter("state", e.target.value)}
          className="p-3 rounded-lg border"
        />

        <input
          type="text"
          placeholder="City"
          value={filters.city}
          onChange={(e) => updateFilter("city", e.target.value)}
          className="p-3 rounded-lg border"
        />

        <input
          type="number"
          placeholder="Min Fees"
          value={filters.minFees}
          onChange={(e) => updateFilter("minFees", e.target.value)}
          className="p-3 rounded-lg border"
        />

        <input
          type="number"
          placeholder="Max Fees"
          value={filters.maxFees}
          onChange={(e) => updateFilter("maxFees", e.target.value)}
          className="p-3 rounded-lg border"
        />

        <input
          type="number"
          placeholder="Min Avg Package"
          value={filters.minPackage}
          onChange={(e) => updateFilter("minPackage", e.target.value)}
          className="p-3 rounded-lg border"
        />

        <input
          type="number"
          placeholder="Max Avg Package"
          value={filters.maxPackage}
          onChange={(e) => updateFilter("maxPackage", e.target.value)}
          className="p-3 rounded-lg border"
        />

        <input
          type="number"
          placeholder="NIRF Rank From"
          value={filters.nirfMin}
          onChange={(e) => updateFilter("nirfMin", e.target.value)}
          className="p-3 rounded-lg border"
        />

        <input
          type="number"
          placeholder="NIRF Rank To"
          value={filters.nirfMax}
          onChange={(e) => updateFilter("nirfMax", e.target.value)}
          className="p-3 rounded-lg border"
        />

        <select
          value={filters.rating}
          onChange={(e) => updateFilter("rating", e.target.value)}
          className="p-3 rounded-lg border"
        >
          <option value="">Any Rating</option>
          <option value="4">4+ Rating</option>
          <option value="3">3+ Rating</option>
        </select>

        {/* CHECKBOXES */}
        <div className="flex flex-col gap-2 text-sm mt-2">
          {[
            { label: "Boys Hostel", key: "hostelBoys" },
            { label: "Girls Hostel", key: "hostelGirls" },
            { label: "Scholarship Available", key: "scholarshipAvailable" },
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters[item.key]}
                onChange={(e) => updateFilter(item.key, e.target.checked)}
                className="accent-blue-600"
              />
              {item.label}
            </label>
          ))}
        </div>

        {/* SORT */}
        <div className="flex flex-col gap-3 mt-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-3 rounded-lg border"
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
            className="p-3 rounded-lg border"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );

  /* ================= PAGE ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10 md:px-10 lg:px-20">
      {/* HERO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Find Your Dream College
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Compare placements, fees, rankings, facilities & more — all in one
          place.
        </p>
      </div>

      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden mb-6 flex justify-between">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow"
        >
          Filters
        </button>
        <Link href="/college-comparison" className="text-blue-600 text-sm">
          Compare
        </Link>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex gap-8">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:block w-[300px]">
          <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
            <FilterUI />
          </div>
        </aside>

        {/* RESULTS */}
        <main className="flex-1">
          <CollegeCard
            filters={filters}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </main>
      </div>

      {/* MOBILE FILTER POPUP */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden">
          <div
            className="absolute inset-0"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="relative w-[90%] max-w-sm h-full bg-white p-5 overflow-y-auto animate-slideIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)}>✕</button>
            </div>
            <FilterUI />
            <button
              onClick={() => setIsFilterOpen(false)}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* PROMOTION */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10 rounded-3xl shadow-xl text-center">
        <h3 className="text-3xl font-bold mb-4">
          Promote Your College or Service
        </h3>
        <p className="mb-6 text-lg opacity-90">
          Reach thousands of students searching daily.
        </p>
        <Link
          href="/sponsors"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 transition"
        >
          Get Featured Now
        </Link>
      </div>
    </div>
  );
}
