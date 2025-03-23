import React from "react";

import { useEffect, useState } from "react";
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
        .filter((exams) => {
          return exams.name.toLowerCase().includes(query.toLowerCase());
        })
        .map((exam) => (
          <div
            key={exam._id}
            className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
          >
            {exam.imageUrl && (
              <Image
                src={exam.imageUrl}
                alt={exam.name}
                width={500}
                height={500}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{exam.name}</h2>
              <p className="text-gray-600">{exam.date}</p>
              <p className="text-gray-600">
                Eligibility: {exam.eligibility.slice(0, 20) + "..."}
              </p>
              <p className="text-gray-600">
                Syllabus: {exam.syllabus.slice(0, 20) + "..."}
              </p>
              <Link
                href={`/exams/${exam._id}`}
                className="text-blue-500 mt-2 inline-block"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ExamCard;
