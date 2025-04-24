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

    if (id) fetchScholarship();
  }, [id]);

  if (loading) return <Loading />;

  if (!id || !scholarship) {
    return (
      <p className="text-center mt-10 text-lg text-red-600">
        Scholarship not found.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-2 text-blue-800">
          {scholarship.name}
        </h1>
        <p className="text-gray-600 text-xs">{scholarship.slug}</p>
        <p className="text-gray-700 mb-6">{scholarship.about}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Amount</h2>
            <p className="text-gray-600">{scholarship.amount}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Deadline
            </h2>
            <p className="text-gray-600">
              {scholarship.deadline?.slice(0, 10)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Type</h2>
            <p className="text-gray-600">{scholarship.type}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Eligibility
            </h2>
            <p className="text-gray-600">{scholarship.eligibility}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Link
            href="/scholarships"
            className="text-gray-700 hover:text-white text-sm btn btn-primary"
          >
            ← Back to Scholarships page
          </Link>

          <a
            href={scholarship.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Visit Official Website
          </a>
        </div>
      </div>
    </div>
  );
}
