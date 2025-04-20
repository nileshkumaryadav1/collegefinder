"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function UpcomingMedicalExamsPage() {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();

        const examList = Array.isArray(data) ? data : data.exams || [];

        const medicalExams = examList.filter((exam) => {
          const combined = `${exam.name} ${exam.category} ${exam.tags?.join(" ")}`.toLowerCase();
          return combined.includes("medical");
        });

        setExams(medicalExams);
        setFilteredExams(medicalExams);
      } catch (error) {
        console.error("Error fetching exams:", error);
        setExams([]);
        setFilteredExams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredExams(exams);
    } else {
      const filtered = exams.filter((exam) =>
        exam.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredExams(filtered);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          Upcoming Medical Exams
        </h1>
        <p className="text-gray-500 text-lg">
          Stay updated with the latest medical entrance exams across India.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search medical exams..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-2/3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />
      </div>

      {/* Count */}
      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        Total Upcoming Exams: {filteredExams.length}
      </div>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <Link key={exam._id} href={`/exams/${exam._id}`}>
            <div className="border rounded-lg shadow-md p-5 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer">
              <h2 className="text-xl font-bold text-red-700 mb-2">
                {exam.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {exam.description?.slice(0, 120)}...
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Level:</span>{" "}
                {exam.level || "All"}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Exam Date:</span>{" "}
                {exam.examDate || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Promotion */}
      <div className="bg-red-100 text-center py-4 mt-10 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-red-700">
          Get Instant Medical Exam Alerts!
        </h2>
        <p className="text-sm mt-2 mb-4 text-gray-700">
          Subscribe now and never miss key updates and deadlines.
        </p>
        <Link
          href="/sponsors"
          className="px-8 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  );
}
