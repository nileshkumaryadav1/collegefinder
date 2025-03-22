"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/custom/Loading";
import { useState, useEffect } from "react";

export default function ScholarshipDetail({ params }) {
  const { id } = useParams() || params;
  const [loading, setLoading] = useState(true);
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await fetch(`/api/scholarships/${id}`);
        const data = await res.json();
        setScholarship(data);
      } catch (error) {
        console.error("Error fetching scholarship:", error);
      }
      setLoading(false);
    };

    fetchScholarship();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!id) {
    return <p className="text-center mt-10">Scholarship not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="m-10 p-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Scholarship Details
          <br />
          {scholarship.about}
        </h1>
        <p className="text-gray-700 mt-2">
          name: {scholarship.name}
          <br />
          description: {scholarship.description}
          <br />
          amount: {scholarship.amount}
          <br />
          deadline: {scholarship.deadline}
          <br />
          type: {scholarship.type}
          <br />
          eligibility: {scholarship.eligibility}
          <br />
          <a
            href={scholarship.officialLink}
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            Official Website
          </a>
          <br />
        </p>
        <Link
          href="/scholarships"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          ← Back to Scholarships
        </Link>
      </div>
    </div>
  );
}
