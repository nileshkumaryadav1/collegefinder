"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CollegeCardForHome from "@/components/custom/CollegeCardForHome";
import Image from "next/image";

function Page() {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/colleges");
        const data = await res.json();

        // Filter colleges that have 'IIT' in their name (case-insensitive)
        const iitColleges = data.filter((college) =>
          college.name.toLowerCase().includes("indian institute of technology")
        );
        setColleges(iitColleges);
        setFilteredColleges(iitColleges); // Initialize filtered colleges with IIT list
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Search functionality (real-time)
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredColleges(colleges); // If search query is empty, show all IIT colleges
    } else {
      const filtered = colleges.filter((college) =>
        college.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredColleges(filtered);
    }
  };

  return (
    <div
      className={`min-h-screen px-4 md:py-8 py-4 md:px-10 lg:px-20 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          IIT Colleges in India
        </h1>
        <p className="text-gray-500 text-lg mb-4">
          Explore and find the best IIT colleges in India. Filter by name,
          location, and more.
        </p>
      </header>

      {/* Search Bar Section */}
      <div className="flex justify-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search IIT Colleges..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-3 w-2/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      {/* Total Count of IIT Colleges */}
      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        <p>Total IIT Colleges: {filteredColleges.length}</p>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center p-30">Loading...</p>}

      {/* College Listings Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 hidden">
        {filteredColleges.map((college) => (
          <Link key={college.slug} href={`/colleges/${college.slug}`}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-400 transition-transform transform hover:scale-[1.03] duration-200 ease-in-out overflow-hidden cursor-pointer">
              <div className="p-6">
                <Image
                  src={college.image}
                  alt={college.name}
                  width={500}
                  height={500}
                  className=""
                />
                <h2 className="text-2xl font-bold text-blue-700 mb-1">
                  {college.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{college.location}</p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="text-blue-500 px-2 py-1 text-md rounded-lg border">
                    <span className="font-medium text-gray-800">
                      NIRF Ranking:
                    </span>{" "}
                    <span className="text-blue-500">
                      {college.nirfRanking || "NA"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <CollegeCardForHome query={'indian institute of technology'} collegeType={''} sortBy={''} sortOrder={''} />
      </div>

      {/* Ad Banner Promotion Section */}
      <div className="bg-yellow-500 text-black text-center py-4 my-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">
          Limited Time Offer: Join the Best IITs Now!
        </h2>
        <p className="text-sm mt-2 mb-4">
          Get exclusive discounts on IIT courses when you apply today!
        </p>
        <Link
          href="/sponsors"
          className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Apply Now
        </Link>
      </div>

      {/* Footer Section */}
      {/* <footer className="mt-12 text-center text-gray-500">
        <p>&copy; 2025 IIT College Finder. All Rights Reserved.</p>
      </footer> */}
    </div>
  );
}

export default Page;
