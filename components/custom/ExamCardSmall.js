"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function ExamCardSmall({ query = "", collegeType = "", sortBy = "", sortOrder = "asc" }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
      setLoading(false);
    };

    fetchExams();
  }, []);

  // Auto scroll for mobile view
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: 280, behavior: "smooth" });
      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [exams]);

  // Filter and sort exams
  const filteredExams = exams
    .filter((exam) => {
      const q = query?.toLowerCase() || "";

      const matchesQuery = exam.name?.toLowerCase().includes(q);
      const matchesType = collegeType
        ? exam.type?.toLowerCase().includes(collegeType.toLowerCase())
        : true;

      return matchesQuery && matchesType;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      let valA = a[sortBy];
      let valB = b[sortBy];

      if (valA == null || valB == null) return 0;

      if (typeof valA === "string" && typeof valB === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      return 0;
    });

  return (
    <div>
      {/* Mobile View: Auto-scrolling */}
      <div
        ref={scrollContainerRef}
        className="flex md:hidden gap-4 overflow-x-auto px-2 pb-4 scroll-smooth"
      >
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          filteredExams.map((exam) => (
            <div
              key={exam.slug}
              className="w-[280px] flex-shrink-0 bg-white rounded-lg shadow-md p-4"
            >
              <Link href={`/exams/${exam.slug}`}>
                <Image
                  src={exam.imageUrl}
                  alt="Exam Image"
                  width={280}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-md font-bold mb-1">{exam.name}</h2>
                <p className="">Eligibility | Syllabus</p>
                <p className="text-gray-600 text-sm mb-2">🗓️{exam.date}</p>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Desktop View: Grid */}
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.slug}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <Link href={`/exams/${exam.slug}`}>
                <Image
                  src={exam.imageUrl}
                  alt={exam.name}
                  width={280}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h2 className="text-md font-bold mb-1">{exam.name}</h2>
                <p className="">Eligibility | Syllabus</p>
                <p className="text-gray-600 text-sm mb-2">🗓️{exam.date}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExamCardSmall;
