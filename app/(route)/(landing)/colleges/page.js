"use client";

import CollegeCard from "@/components/custom/CollegeCard";
import { useState } from "react";

export default function CollegesPage() {
  const [query, setQuery] = useState("");
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Colleges</h1>
      <input
        type="text"
        placeholder="Search colleges..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mb-4 w-full"
      />
      <CollegeCard query={query} />
    </div>
  );
}
