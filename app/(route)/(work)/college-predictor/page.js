"use client";

import { useState, useEffect } from "react";

export default function AdmissionPredictorPage() {
  const [score, setScore] = useState("");
  const [colleges, setColleges] = useState([]);
  const [predictedColleges, setPredictedColleges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

   const [category, setCategory] = useState("");
   const categories = [
    "General",
    "OBC-NCL",
    "General-EWS",
    "Scheduled Castes",
    "Scheduled Tribes",
  ];

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/colleges");
        if (!res.ok) throw new Error("Failed to fetch colleges");
        const data = await res.json();
        setColleges(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load colleges. Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchColleges();
  }, []);

  const handlePrediction = (e) => {
    e.preventDefault();
    if (!score) return;

    setIsLoading(true);

    const results = colleges.map((college) => ({
      name: college.name,
      year: college.year,
      eligible: parseInt(score) >= college.cutOff ? "Eligible" : "Not Eligible",
      cutOff: college.cutOff,
    }));

    setPredictedColleges(results);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-12 px-6">
      {/* Hero */}
      <div className="max-w-2xl text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          College Admission Predictor
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Enter your exam score and find colleges you are eligible for!
        </p>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handlePrediction}
        className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6 mb-16"
      >
                <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
        >
          <option value="">Select your category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          placeholder="Enter your score..."
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold text-lg disabled:bg-blue-400"
        >
          {isLoading ? "Predicting..." : "Predict Colleges"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="w-full max-w-xl bg-red-100 text-red-700 p-4 rounded-lg mb-8 text-center">
          {error}
        </div>
      )}

      {/* Loading */}
      {isFetching ? (
        <div className="text-gray-500 text-lg">Loading colleges...</div>
      ) : (
        <>
          {/* Prediction Results */}
          {predictedColleges.length > 0 && (
            <section className="w-full max-w-6xl mb-20">
              <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                Prediction Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {predictedColleges.map((college, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                      {college.name}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      Cut-off Score: {college.cutOff}
                    </p>
                    <p
                      className={`font-semibold ${
                        college.eligible === "Eligible"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {college.eligible}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Previous Year Cut-offs */}
          <section className="w-full max-w-6xl">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">
              Previous Year Cut-offs
            </h2>

            <p className="text-gray-700 text-sm italic">
              * Below are the JOSAA 2024 round 5 closing ranks for male-only
              candidates, specific to the CSE (B.Tech) program.
            </p>
            <p className="text-gray-700 text-sm mb-4 italic">
              * All mentioned ranks are category-wise.
            </p>

            {colleges.length > 0 ? (
              <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
                <table className="w-full text-sm md:text-base text-gray-700">
                  <thead className="bg-blue-100 text-blue-800 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 text-left">College</th>
                      <th className="px-6 py-4 text-left">Year</th>
                      <th className="px-6 py-4 text-left">Cut-off</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colleges.map((college, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{college.name}</td>
                        <td className="px-6 py-4">{college.year || 2024}</td>
                        <td className="px-6 py-4">
                          <Table
                            head={["Category", "Cut Offs"]}
                            rows={[
                              [
                                <ul key="category-list">
                                  {[
                                    "General",
                                    "OBC-NCL",
                                    "General-EWS",
                                    "Scheduled Castes",
                                    "Scheduled Tribes",
                                  ].map((category, index) => (
                                    <li key={index} className="mb-1 border-b">
                                      {category}
                                    </li>
                                  ))}
                                </ul>,
                                <ul key="cutoff-list">
                                  {college.cutOff
                                    ? college.cutOff
                                        .split(",")
                                        .filter(
                                          (line) => line.trim().length > 0
                                        )
                                        .map((line, idx) => (
                                          <li
                                            key={idx}
                                            className="mb-1 border-b text-gray-800"
                                          >
                                            {line.trim()}
                                          </li>
                                        ))
                                    : "Cut-off data not available."}
                                </ul>,
                              ],
                            ]}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-6">
                No colleges found.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}

// Components
const Table = ({ head = [], rows }) => (
  <div className="overflow-x-auto max-w-4xl mx-auto">
    <table className="w-full border-collapse border text-left mt-4">
      {head.length > 0 && (
        <thead className="bg-gray-100 border-b">
          <tr>
            {head.map((item, idx) => (
              <th key={idx} className="p-3 font-medium border">
                {item}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="even:bg-gray-50">
            {row.map((cell, j) => (
              <td key={j} className="p-3 border">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
