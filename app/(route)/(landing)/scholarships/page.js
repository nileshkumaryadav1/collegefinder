"use client";

import ScholarshipCard from "@/components/custom/ScholarshipCard";

export default function Scholarships() {

  return (
    <div className="min-h-screen bg-gray-600 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Scholarships</h1>
      <ScholarshipCard />
    </div>
  );
}
