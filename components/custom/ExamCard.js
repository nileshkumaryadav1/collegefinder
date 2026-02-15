"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingSkeleton from "./myself/LoadingSkeleton";

function ExamCard({ query }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const search = query?.toLowerCase() || "";

  const filteredExams = exams.filter((exam) =>
    exam.name?.toLowerCase().includes(search),
  );

  return (
    <section>
      {/* total exams */}
      <div className="mb-8 flex justify-center font-medium">
        Total Exams: {filteredExams.length}
      </div>

      {loading && (
        <div className="md:flex justify-between items-center mb-4 gap-4">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      )}

      {filteredExams.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No exams found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.slug}
              className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-101 hover:shadow-xl"
            >
              {/* Main Clickable Area */}
              <Link href={`/exams/${exam.slug}`}>
                {exam.imageUrl ? (
                  <Image
                    src={exam.imageUrl}
                    alt={exam.name}
                    width={400}
                    height={300}
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex justify-center items-center">
                    <p className="text-gray-500">No Image Available</p>
                  </div>
                )}

                <div className="px-6 py-3">
                  <h2 className="text-xl font-semibold text-[var(--accent)] mb-2">
                    {exam.name}
                  </h2>
                </div>
              </Link>

              {/* Details Section */}
              <div className="px-6 pb-4">
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Date:</strong> {exam.date}
                </p>

                <p className="text-gray-600 text-sm mb-2">
                  <strong>Category:</strong> {exam.type}
                </p>

                <p className="text-gray-600 text-sm mb-2">
                  <strong>Eligibility:</strong> {exam.eligibility?.slice(0, 40)}
                  ...
                </p>

                {exam.syllabus && (
                  <a
                    href={exam.syllabus}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm block mb-3"
                  >
                    View Syllabus
                  </a>
                )}

                <Link
                  href={`/exams/${exam.slug}`}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExamCard;
