"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// All 28 states + 9 union territories
const statesAndUTs = [
  "Select State",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

function Page() {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/colleges");
        const data = await res.json();

        setColleges(data);
        const filtered = data.filter((college) =>
          college.location.toLowerCase().includes("")
        );
        setFilteredColleges(filtered);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  useEffect(() => {
    // Filter colleges by selected state
    const stateFiltered = colleges.filter((college) =>
      college.location.toLowerCase().includes(selectedState.toLowerCase())
    );
    setFilteredColleges(stateFiltered);
    setSearchQuery("");
  }, [selectedState, colleges]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = colleges
      .filter((college) =>
        college.location.toLowerCase().includes(selectedState.toLowerCase())
      )
      .filter((college) =>
        college.name.toLowerCase().includes(query.toLowerCase())
      );
    setFilteredColleges(filtered);
  };

  return (
    <div
      className={`min-h-screen px-4 md:py-8 py-4 md:px-10 lg:px-20 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <header className="text-center mb-8">
        <h1 className="md:text-4xl text-3xl font-bold text-blue-600 mb-2">
          {selectedState} Colleges 🏫
        </h1>
        <p className="text-gray-500 text-lg mb-4">
          Explore and find top {selectedState} Colleges. Filter by name,
          location, and more.
        </p>
      </header>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="p-3 w-full md:w-1/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          {statesAndUTs.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder={`Search Colleges in ${selectedState}...`}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-3 w-full md:w-2/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        <p>
          Total Colleges in {selectedState}: {filteredColleges.length}
        </p>
      </div>

      {loading && <p className="text-center p-30">Loading...</p>}

      {/* colleges card */}
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => (
          <div
            key={college.slug}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            <Link href={`/colleges/${college.slug}`}>
              <div className="flex items-center justify-between mb-4">
                <Image
                  src={college.logoUrl}
                  alt={`${college.name} logo`}
                  width={100}
                  height={100}
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
                height={300}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-md font-bold mb-1">{college.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{college.location}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-yellow-500 text-black text-center py-4 my-8 rounded-lg shadow-lg">
        <h2 className="text-xl md:text-3xl font-semibold text-black">
          Apply to Top {selectedState} Colleges Today!
        </h2>
        <p className="text-sm mt-2 mb-4">
          Explore top-rated institutions in {selectedState} and secure your
          future now.
        </p>
        <Link
          href="/sponsors"
          rel="noopener noreferrer"
          className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default Page;
