"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import the Link component from Next.js

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

        // Filter colleges that have 'NIT' in their name (case-insensitive)
        const nitColleges = data.filter((college) =>
          college.name.toLowerCase().includes("nit")
        );
        setColleges(nitColleges);
        setFilteredColleges(nitColleges); // Initialize filtered colleges with NIT list
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
      setFilteredColleges(colleges); // If search query is empty, show all NIT colleges
    } else {
      const filtered = colleges.filter((college) =>
        college.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredColleges(filtered);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className={`min-h-screen px-4 md:py-8 py-4 md:px-10 lg:px-20 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          NIT Colleges in India
        </h1>
        <p className="text-gray-500 text-lg mb-4">
          Explore and find the best NIT colleges in India. Filter by name,
          location, and more.
        </p>

        {/* Dark/Light Mode Toggle */}
        {/* <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-md dark:bg-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
          >
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div> */}
      </header>

      {/* Search Bar Section */}
      <div className="flex justify-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search NIT Colleges..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-3 w-2/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      {/* Total Count of NIT Colleges */}
      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        <p>Total NIT Colleges: {filteredColleges.length}</p>
      </div>

      {/* College Listings Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredColleges.map((college) => (
          <Link key={college._id} href={`/colleges/${college._id}`}>
            <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-600">
                  {college.name}
                </h2>
                <p className="text-gray-600 mb-2">{college.location}</p>
                <p className="text-gray-600 mb-2">Fees: ₹{college.fees}</p>
                <p className="text-gray-600 mb-2">Rating: {college.rating}</p>
                <p className="text-gray-500 text-sm">
                  Best for: Engineering Programs
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Ad Banner Promotion Section */}
      <div className="bg-yellow-500 text-black text-center py-4 my-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">
          Limited Time Offer: Join the Best NITs Now!
        </h2>
        <p className="text-sm mt-2 mb-4">
          Get exclusive discounts on NIT courses when you apply today!
        </p>
        <a
          href="https://www.example.com" // Example link for the promotion
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Apply Now
        </a>
      </div>

      {/* Footer Section */}
      {/* <footer className="mt-12 text-center text-gray-500">
        <p>&copy; 2025 NIT College Finder. All Rights Reserved.</p>
      </footer> */}
    </div>
  );
}

export default Page;
