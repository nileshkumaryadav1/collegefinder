"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
      setLoading(false);
    };
    
    fetchColleges();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading colleges...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Colleges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <div key={college._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={college.image} alt={college.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{college.name}</h2>
              <p className="text-gray-600">{college.location}</p>
              <p className="text-gray-800 font-bold">Ranking: #{college.ranking}</p>
              <Link href={`/colleges/${college._id}`} className="text-blue-500 mt-2 inline-block">
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
