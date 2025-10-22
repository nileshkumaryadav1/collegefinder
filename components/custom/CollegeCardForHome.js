"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; // Framer Motion import

function CollegeCardForHome({ query, collegeType, sortBy, sortOrder }) {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(data.colleges);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
      setLoading(false);
    };

    fetchColleges();
  }, []);

  // Auto scroll mobile view
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: 280, behavior: "smooth" });
      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [colleges]);

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

      if (typeof valA === "string" && typeof valB === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      return 0;
    });

  return (
    <div>
      {/* Mobile View: Horizontal Scroll */}
      <div
        ref={scrollContainerRef}
        className="flex md:hidden gap-4 overflow-x-auto px-2 pb-4 scroll-smooth"
      >
        {loading && <p className="text-center p-30 hidden">Loading...</p>}

        {filteredColleges.map((college) => (
          <motion.div
            key={college.slug}
            whileHover={{ scale: 1.03, boxShadow: "0px 6px 20px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-[280px] flex-shrink-0 bg-white rounded-lg shadow-md p-4 cursor-pointer"
          >
            <Link href={`/colleges/${college.slug}`}>
              <div className="flex items-center justify-between mb-4">
                <Image
                  src={college.logoUrl}
                  alt="College logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 md:w-16 md:h-16 object-contain rounded"
                />
                <span className="text-xs md:text-sm font-medium text-gray-600 btn btn-primary">
                  #{college.nirfRanking}
                </span>
              </div>
              <Image
                src={college.imageUrl}
                alt="College Image"
                width={280}
                height={200}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="md:text-md text-sm font-bold mb-1">{college.name}</h2>
              <p className="text-gray-600 md:text-sm text-xs mb-2">
                {college.location}
              </p>
              <p className="text-gray-500 text-xs">
                View Details → Cutoff | Admission | Placements | Facilities
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Desktop View: Grid */}
      {loading && <p className="text-center p-30">Loading...</p>}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => (
          <motion.div
            key={college.slug}
            whileHover={{ scale: 1.03, boxShadow: "0px 6px 20px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer"
          >
            <Link href={`/colleges/${college.slug}`}>
              <div className="flex items-center justify-between mb-4">
                <Image
                  src={college.logoUrl}
                  alt={`${college.name} logo`}
                  width={40}
                  height={40}
                  className="w-16 h-16 object-contain rounded"
                />
                <span className="text-sm font-medium text-gray-600 btn btn-primary">
                  #{college.nirfRanking}
                </span>
              </div>
              <Image
                src={college.imageUrl}
                alt={college.name}
                width={400}
                height={400}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-md font-bold mb-1">{college.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{college.location}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CollegeCardForHome;
