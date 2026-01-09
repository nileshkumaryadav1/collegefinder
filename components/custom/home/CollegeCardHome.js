"use client";

import React, { useEffect, useRef, useState } from "react";
import SmallCollegeCard from "../SmallCollegeCard";

function CollegeCardHome({ query, collegeType, sortBy, sortOrder }) {
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
      {/* ================= MOBILE: HORIZONTAL SCROLL ================= */}
      <div
        ref={scrollContainerRef}
        className="
    md:hidden flex gap-4 overflow-x-auto scroll-smooth
    py-2 px-2
    scrollbar-hide
  "
      >
        {filteredColleges.map((college) => (
          <SmallCollegeCard key={college._id} college={college} horizontal />
        ))}
      </div>

      {/* Desktop View: Grid */}
      {loading && <p className="text-center p-30">Loading...</p>}

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => (
          <SmallCollegeCard key={college._id} college={college} />
        ))}
      </div>
    </div>
  );
}

export default CollegeCardHome;
