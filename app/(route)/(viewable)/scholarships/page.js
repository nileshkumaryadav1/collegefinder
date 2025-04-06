"use client";

import ScholarshipCard from "@/components/custom/ScholarshipCard";
import { useState } from "react";

export default function Scholarships() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen p-6 bg-gray-100 md:px-20">
      <h1 className="text-3xl font-bold text-center mb-6">Scholarships</h1>
      <input
        type="text"
        placeholder="Search scholarships..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mb-4 w-full bg-white"
      />
      <ScholarshipCard query={query} />
    </div>
  );
}
