import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/custom/Loading";

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

  if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams
        .filter((exam) => {
          return exam.name.toLowerCase().includes(query.toLowerCase());
        })
        .map((exam) => (
          <div
            key={exam._id}
            className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <Link href={`/exams/${exam._id}`}>
              {/* Conditionally rendering image */}
              {exam.imageUrl ? (
                <Image
                  src={exam.imageUrl}
                  alt={exam.name}
                  width={500}
                  height={300}
                  className="w-full object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex justify-center items-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {exam.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Date:</strong> {exam.date}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  <strong>Eligibility:</strong> {exam.eligibility.slice(0, 40)}
                  ...
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  <strong>Syllabus:</strong> {exam.syllabus.slice(0, 40)}...
                </p>

                {/* View Details Link */}
                <Link
                  href={`/exams/${exam._id}`}
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
