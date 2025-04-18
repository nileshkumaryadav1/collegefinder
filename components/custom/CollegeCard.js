"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/custom/Loading";

function CollegeCard({ query, collegeType, sortBy, sortOrder }) {
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

  // 🧠 Apply filtering
  const filteredColleges = colleges
    .filter((college) => {
      const matchesQuery = college.name
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesType = collegeType ? college.type === collegeType : true;

      return matchesQuery && matchesType;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      let valA = a[sortBy];
      let valB = b[sortBy];

      // If value is string (e.g., name)
      if (typeof valA === "string" && typeof valB === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      // If value is number (e.g., fees, rating, placement)
      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      return 0;
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredColleges.map((college) => (
        <div
          key={college._id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col mb-2"
        >
          <div className="flex items-center justify-between mb-4">
            <img
              src={college.logoUrl}
              alt={`${college.name} logo`}
              className="w-16 h-16 object-contain rounded"
            />
            <span className="text-sm font-medium text-gray-600 btn btn-primary">
              #{college.nirfRanking}
            </span>
          </div>

          <Link href={`/colleges/${college._id}`}>
            <img
              src={college.imageUrl}
              alt={college.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
          </Link>

          <Link href={`/colleges/${college._id}`}>
            <h2 className="text-xl font-bold mb-1">{college.name}</h2>
          </Link>
          <p className="text-gray-600 text-sm mb-2">{college.location}</p>

          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Affiliation:</span>{" "}
            {college.affiliation}
          </p>

          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Type:</span> {college.type}
          </p>

          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Courses:</span> {college.courses}
          </p>

          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Facilities:</span>{" "}
            {college.facilities}
          </p>

          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Students:</span>{" "}
            {college.noOfStudents}
            &nbsp; | &nbsp;
            <span className="font-semibold">Faculties:</span>{" "}
            {college.noOfFaculties}
          </p>

          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Admission:</span>{" "}
            {/* {college.admissionProcess} */}
            Admission are done on the basis of....
          </p>

          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Fees:</span> ₹{college.fees}
            <br />
            <span className="font-semibold">Hostel:</span> ₹{college.hostelFees}
            <br />
            <span className="font-semibold">Other:</span> ₹{college.otherFees}
          </p>

          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Placement:</span>{" "}
            {college.averagePlacement}
            <br />
            <span className="font-semibold">Median Salary:</span> ₹
            {college.medianSalary}
          </p>

          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Description:</span>{" "}
            {college.description.slice(0, 100) + "..."}
          </p>

          <div className="my-3">
            <img
              src={college.pastRecruitor}
              alt="Past Recruitor"
              className="w-full h-20 object-cover rounded-md"
            />
          </div>

          <div className="mt-auto flex justify-between items-center">
            <a
              href={college.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              Visit Website
            </a>
            <Link
              href={`/colleges/${college._id}`}
              className="btn btn-primary my-1"
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
