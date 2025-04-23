"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/custom/Loading";

export default function ExamDetailsPage() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await fetch(`/api/exams/${id}`);
        const data = await res.json();
        setExam(data);
      } catch (error) {
        console.error("Error fetching exam:", error);
      }
      setLoading(false);
    };

    fetchExam();
  }, [id]);

  if (loading) return <Loading />;
  if (!exam) return <p className="text-center mt-10">Exam not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {exam.imageUrl && (
        <img
          src={exam.imageUrl}
          alt={exam.name}
          className="w-full object-cover object-center border rounded-lg shadow-md"
        />
      )}
      <h1 className="text-3xl font-bold mt-4">{exam.name}</h1>
      <p className="text-gray-700">{exam.date}</p>
      <p className="text-gray-700 mt-2">Category: {exam.type}</p>
      <p className="text-gray-800 mt-2 text-justify">
        Eligibility: {exam.eligibility}
      </p>
      <p className="mt-4 text-justify">Syllabus: {exam.syllabus}</p>
      <div className="flex justify-between">
        <Link
          href="/exams"
          className="text-gray-600 mt-4 py-2 w-2/5 btn btn-primary"
        >
          ← Back to Exams
        </Link>
        <a
          href={exam.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 mt-4 w-1/2 btn btn-link"
        >
          Visit Official Website
        </a>
      </div>
    </div>
  );
}
