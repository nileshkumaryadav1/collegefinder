"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const CollegeComparison = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load colleges. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleSelectCollege = (e) => {
    const collegeId = e.target.value;
    if (collegeId && !selectedColleges.includes(collegeId)) {
      setSelectedColleges((prev) => [...prev, collegeId]);
    }
  };

  const handleCompare = async () => {
    if (selectedColleges.length < 2) {
      alert("Select at least two colleges to compare.");
      return;
    }

    try {
      setLoading(true);
      const url = new URL("/api/colleges/compare", window.location.origin);
      selectedColleges.forEach((id) =>
        url.searchParams.append("collegeIds", id)
      );
      const res = await fetch(url.toString());
      const data = await res.json();
      setComparisonData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch comparison data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCollege = (id) => {
    setSelectedColleges((prev) => prev.filter((collegeId) => collegeId !== id));
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        College Comparison
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <select
          onChange={handleSelectCollege}
          className="w-full md:w-64 p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a college</option>
          {colleges.map((college) => (
            <option key={college._id} value={college._id}>
              {college.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCompare}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Comparing..." : "Compare"}
        </button>
      </div>

      {error && <div className="text-red-500 text-center mb-6">{error}</div>}

      {/* Selected Colleges */}
      {selectedColleges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {selectedColleges.map((id) => {
            const college = colleges.find((c) => c._id === id);
            return (
              <div
                key={id}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {college?.name || "Unknown College"}
                <button
                  onClick={() => handleRemoveCollege(id)}
                  className="text-red-600 hover:text-red-800 font-bold"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Comparison Cards */}
      {comparisonData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisonData.map((college) => (
            <div
              key={college._id}
              className="p-6 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-all border border-gray-200"
            >
              <div className="flex items-center mb-4">
                {college.logoUrl && (
                  <Image
                    src={college.logoUrl}
                    alt={college.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                )}
                <h2 className="text-xl font-semibold">{college.name}</h2>
              </div>

              {college.imageUrl && (
                <Image
                  src={college.imageUrl}
                  alt={`${college.name} campus`}
                  width={400}
                  height={300}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  <strong>Ranking:</strong> {college.ranking || "N/A"}
                </p>
                <p>
                  <strong>Fees:</strong> {college.fees || "N/A"}
                </p>
                <p>
                  <strong>Highest Package:</strong>{" "}
                  {college.highestPlacement || "N/A"}
                </p>
                <p>
                  <strong>Average Package:</strong>{" "}
                  {college.averagePlacement || "N/A"}
                </p>
                <p>
                  <strong>Location:</strong> {college.location || "N/A"}
                </p>
                <p>
                  <strong>Courses:</strong>{" "}
                  {college.courses || "N/A"}
                </p>

                {/* Add Cutoff Section */}
                {college.cutoffs && college.cutoffs.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-bold mb-2 text-blue-600">Cut-offs</h3>
                    <ul className="list-disc list-inside">
                      {college.cutoffs.map((cutoff, index) => (
                        <li key={index}>
                          {cutoff.branch} - {cutoff.rank}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollegeComparison;
