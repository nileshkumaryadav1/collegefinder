"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

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

        // Filter colleges that have 'delhi' in name or location (case-insensitive)
        const delhiColleges = data.filter((college) =>
          college.name.toLowerCase().includes("delhi") ||
          college.location.toLowerCase().includes("delhi")
        );
        setColleges(delhiColleges);
        setFilteredColleges(delhiColleges);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredColleges(colleges);
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
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Colleges in Delhi 🏫
        </h1>
        <p className="text-gray-500 text-lg mb-4">
          Explore and find top colleges in Delhi. Filter by name, location, and more.
        </p>
      </header>

      <div className="flex justify-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Colleges in Delhi..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-3 w-2/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        <p>Total Colleges in Delhi: {filteredColleges.length}</p>
      </div>

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
                  Known for academic excellence in Delhi.
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-yellow-500 text-black text-center py-4 my-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">
          Apply to Top Delhi Colleges Today!
        </h2>
        <p className="text-sm mt-2 mb-4">
          Explore top-rated institutions in Delhi and secure your future now.
        </p>
        <a
          href="https://www.example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}

export default Page;
