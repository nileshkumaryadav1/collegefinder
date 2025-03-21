import React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/custom/Loading";

function CollegeCard() {
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

  if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {colleges.map((college) => (
        <div
          key={college._id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{college.name}</h2>
            <p className="text-gray-600">{college.location}</p>
            <p className="text-gray-800 font-bold">
              Ranking: #{college.ranking}
            </p>
            <Link
              href={`/colleges/${college._id}`}
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

export default CollegeCard;
