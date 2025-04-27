"use client";

import { useState, useEffect } from "react";

const CollegeComparison = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    // Fetch all colleges for selection using fetch
    fetch("/api/colleges")
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setColleges(data)) // Set the colleges in the state
      .catch((err) => console.error("Error fetching colleges", err));
  }, []);

  const handleSelectCollege = (e) => {
    const collegeId = e.target.value;
    if (!selectedColleges.includes(collegeId)) {
      setSelectedColleges([...selectedColleges, collegeId]);
    }
  };

  const handleCompare = () => {
    // Call API to fetch comparison data using fetch
    if (selectedColleges.length < 2) {
      alert("Please select at least two colleges to compare.");
      return;
    }

    const url = new URL("/api/colleges/compare", window.location.origin);
    selectedColleges.forEach((id) => url.searchParams.append("collegeIds", id));

    fetch(url)
      .then((res) => res.json()) // Parse the response
      .then((data) => setComparisonData(data)) // Set the comparison data in the state
      .catch((err) => console.error("Error fetching comparison data", err));
  };

  return (
    <div className="container mx-auto md:py-10 py-3 px-4 md:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Compare Colleges
      </h2>

      <div className="mb-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <select
          onChange={handleSelectCollege}
          className="p-3 border rounded-lg shadow-md bg-white text-gray-800 w-full sm:w-auto"
        >
          <option>Select first College</option>
          {colleges.map((college) => (
            <option key={college._id} value={college._id}>
              {college.slug}
            </option>
          ))}
        </select>

        <select
          onChange={handleSelectCollege}
          className="p-3 border rounded-lg shadow-md bg-white text-gray-800 w-full sm:w-auto"
        >
          <option>Select another College</option>
          {colleges.map((college) => (
            <option key={college._id} value={college._id}>
              {college.slug}
            </option>
          ))}
        </select>

        <button
          onClick={handleCompare}
          className="md:ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Compare
        </button>
      </div>

      <div className="comparison-results mt-10">
        {comparisonData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonData.map((college) => (
              <div
                key={college._id}
                className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={college.logoUrl}
                    alt={college.name}
                    className="w-16 h-16 mr-4 rounded-full"
                  />
                  <h4 className="text-xl font-semibold text-gray-800">
                    {college.name}
                  </h4>
                </div>
                <img
                  src={college.imageUrl}
                  alt={`${college.name} campus`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p>
                  <strong className="text-gray-700">Ranking:</strong>{" "}
                  {college.ranking}
                </p>
                <p>
                  <strong className="text-gray-700">Fees:</strong>{" "}
                  {college.fees}
                </p>
                <p>
                  <strong className="text-gray-700">Highest Placement:</strong>{" "}
                  {college.highestPlacement}
                </p>
                <p>
                  <strong className="text-gray-700">Average Placement:</strong>{" "}
                  {college.averagePlacement}
                </p>
                <p>
                  <strong className="text-gray-700">Location:</strong>{" "}
                  {college.location}
                </p>
                <p>
                  <strong className="text-gray-700">Courses Offered:</strong>{" "}
                  {college.courses}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeComparison;
