"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExamsPage() {
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

  if (loading) return <p className="text-center mt-10">Loading exams...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Exams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2019/12/exam-1575444923.jpg'} alt={exam.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{exam.name}</h2>
              <p className="text-gray-600">{exam.date}</p>
              <p className="text-gray-600">Eligibility: {exam.eligibility.slice(0, 20) + "..."}</p>
              <p className="text-gray-600">Syllabus: {exam.syllabus.slice(0, 20) + "..."}</p>
              <Link href={`/exams/${exam._id}`} className="text-blue-500 mt-2 inline-block">
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}