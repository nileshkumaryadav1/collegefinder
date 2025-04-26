import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function ExamCard({ query }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center p-30>">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams
        .filter((exam) => {
          return (
            exam.name?.toLowerCase().includes(query.toLowerCase())
          );
        })
        .map((exam) => (
          <div
            key={exam.slug}
            className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <Link href={`/exams/${exam.slug}`}>
              {/* Conditionally rendering image */}
              {exam.imageUrl ? (
                <img
                  src={exam.imageUrl}
                  alt={exam.name}
                  className="h-40 mx-auto mt-2 rounded object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex justify-center items-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}

              <div className="px-6 py-3">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {exam.name} | {exam.slug}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Date:</strong> {exam.date}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Category:</strong> {exam.type}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  <strong>Eligibility:</strong> {exam.eligibility?.slice(0, 40)}
                  ...
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  <strong>Syllabus:</strong> {exam.syllabus?.slice(0, 40)}...
                </p>

                {/* View Details Link */}
                <Link
                  href={`/exams/${exam.slug}`}
                  className="text-blue-500 hover:text-blue-700 w-full btn btn-primary transition duration-300 text-sm"
                >
                  View Details →
                </Link>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default ExamCard;
