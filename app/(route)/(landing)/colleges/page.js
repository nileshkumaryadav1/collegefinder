"use client";

import CollegeCard from "@/components/custom/CollegeCard";
import { useState } from "react";

export default function CollegesPage() {
  const [query, setQuery] = useState("");
  return (
    <div className="bg-gray-100 p-6 md:px-20">
      <h1 className="text-3xl font-bold text-center mb-6">Colleges</h1>
      <input
        type="text"
        placeholder="Search colleges..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full mb-4 bg-white"
      />
      <CollegeCard query={query} />
    </div>
  );
}
