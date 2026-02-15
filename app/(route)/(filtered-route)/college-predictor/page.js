"use client";

import Link from "next/link";
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
    if (!score || !category) return;

    setIsLoading(true);

    const userRank = parseInt(score);

    const results = colleges
      .map((college) => {
        if (!college.cutOff || college.cutOff.length === 0) return null;

        // Find matching cut-off for B.Tech CSE + selected category
        const matchingCutoff = college.cutOff.find(
          (c) =>
            c.program === "B.Tech" &&
            c.specialization?.toLowerCase() === "cse" &&
            c.category === category,
        );

        if (!matchingCutoff) return null;

        const closingRank = parseInt(matchingCutoff.closingRank);

        if (userRank <= closingRank) {
          return {
            _id: college._id,
            name: college.name,
            slug: college.slug,
            location: college.location,
            logoUrl: college.logoUrl,
            nirfRanking: college.nirfRanking,
            closingRank,
            eligible: "Eligible",
          };
        }

        return null;
      })
      .filter(Boolean);

    setPredictedColleges(results);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center md:py-12 py-6 px-6">
      {/* Hero */}
      <div className="max-w-2xl text-center md:mb-12 mb-6">
        <h1 className="text-2xl md:text-5xl font-bold text-blue-800 md:mb-4">
          College Admission Predictor
        </h1>
        <p className="text-gray-600 text-sm md:text-lg">
          Enter your exam score and find colleges you are eligible for!
        </p>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handlePrediction}
        className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6 md:mb-16 mb-8"
      >
        <p className="text-gray-600 text-xs">
          * Only General categories are working now.
        </p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
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
          placeholder="Enter your JEE Adv. Rank..."
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
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

      {/* Predicted college result */}
      {isFetching ? (
        <div className="text-gray-500 text-lg">Loading colleges...</div>
      ) : (
        <>
          {/* ================= Prediction Results ================= */}
          {predictedColleges.length > 0 && (
            <section className="w-full max-w-6xl md:mb-20 mb-10">
              <h2 className="text-2xl font-bold text-green-700 text-center">
                Predicted Colleges
              </h2>

              <p className="md:text-xl text-md text-gray-600 md:mb-10 mb-6 text-center">
                Based on your rank <strong>{score}</strong>, you are eligible
                for CSE (B.Tech) in the following colleges:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {predictedColleges.map((college) => (
                  <div
                    key={college._id}
                    className="flex flex-col h-full p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-gray-200"
                  >
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={college.logoUrl || "/logo.png"}
                        alt="College Logo"
                        className="w-20 h-20 object-contain mb-3"
                      />

                      <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-1">
                        {college.name}
                      </h3>

                      <p className="text-sm text-gray-600">
                        {college.location}
                      </p>

                      {college.nirfRanking && (
                        <p className="text-xs text-gray-500 mt-1">
                          NIRF Rank: {college.nirfRanking}
                        </p>
                      )}
                    </div>

                    {/* Cutoff Section */}
                    <div className="text-sm text-gray-700 mt-4">
                      <p className="font-semibold text-gray-600 mb-1">
                        Category-wise Closing Ranks:
                      </p>

                      <ul className="space-y-1">
                        {college.cutOff?.map((cut, idx) => (
                          <li key={idx} className="text-gray-800">
                            {cut.category}: {cut.closingRank}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Facilities */}
                    {college.facilities?.length > 0 && (
                      <div className="mt-4">
                        <p className="font-semibold text-gray-600 text-sm mb-1">
                          Facilities:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {college.facilities.map((facility, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                            >
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="mt-auto font-semibold text-green-600 text-sm mt-4">
                      Eligible
                    </p>

                    <Link
                      href={`/colleges/${college.slug}`}
                      className="mt-3 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition"
                    >
                      View Details →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================= Previous Year Cutoffs ================= */}
          <section className="w-full max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center md:mb-6 mb-3">
              Previous Year Cut-offs
            </h2>

            <p className="text-gray-600 text-xs md:text-sm italic text-center mb-6">
              Below are JOSAA 2024 Round 5 closing ranks for B.Tech (CSE).
            </p>

            {colleges.length > 0 ? (
              <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
                <table className="w-full text-sm md:text-base text-gray-700">
                  <thead className="bg-blue-100 text-blue-800 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 text-left">College</th>
                      <th className="px-6 py-4 text-left">Category</th>
                      <th className="px-6 py-4 text-left">Closing Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colleges.map((college) =>
                      college.cutOff?.map((cut, idx) => (
                        <tr
                          key={`${college._id}-${idx}`}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-3">{college.name}</td>
                          <td className="px-6 py-3">{cut.category}</td>
                          <td className="px-6 py-3">{cut.closingRank}</td>
                        </tr>
                      )),
                    )}
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
