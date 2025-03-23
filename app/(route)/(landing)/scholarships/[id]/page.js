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
    <div className="mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-white container border border-gray-300 grid gap-4 rounded lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 md:mt-10 md:m-10 md:p-10 p-4 mb-2 flex flex-col items-center justify-center">
        <h2 className="md:text-3xl text-xl font-bold">
        Scholarship Details:</h2>
        <h1 className="md:text-2xl font-bold">
          {scholarship.name}
        </h1>
        <p className="text-gray-700 md:mt-2">
          Name: {scholarship.name}
          <br />
          Description: {scholarship.about}
          <br />
          Amount: {scholarship.amount}
          <br />
          Deadline/Last Date: {scholarship.deadline}
          <br />
          Type: {scholarship.type}
          <br />
          Eligibility: {scholarship.eligibility}
          <br />
          <a
            href={scholarship.officialLink}
            className="text-blue-600 hover:underline mt-2 inline-block text-center border border-blue-600 p-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
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
          ← Back to Scholarships page
        </Link>
      </div>
    </div>
  );
}
