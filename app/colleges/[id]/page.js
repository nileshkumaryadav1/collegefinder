"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CollegeDetailsPage() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await fetch(`/api/colleges/${id}`);
        const data = await res.json();
        setCollege(data);
      } catch (error) {
        console.error("Error fetching college:", error);
      }
      setLoading(false);
    };

    fetchCollege();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading college details...</p>;
  if (!college) return <p className="text-center mt-10">College not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={college.image} alt={college.name} className="w-full h-60 object-cover rounded-lg shadow-md" />
      <h1 className="text-3xl font-bold mt-4">{college.name}</h1>
      <p className="text-gray-700">{college.location}</p>
      <p className="text-gray-800 font-bold text-lg mt-2">Ranking: #{college.ranking}</p>
      <p className="mt-4">{college.description}</p>
      <a href={college.website} target="_blank" className="text-blue-500 mt-4 block">Visit Website</a>
      <Link href="/colleges" className="text-gray-600 mt-4 block">← Back to Colleges</Link>
    </div>
  );
}
