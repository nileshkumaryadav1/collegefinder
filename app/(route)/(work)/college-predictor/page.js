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

    const categoryMap = {
      General: 0,
      "OBC-NCL": 1,
      "General-EWS": 2,
      "Scheduled Castes": 3,
      "Scheduled Tribes": 4,
    };

    const catIndex = categoryMap[category];

    const results = colleges
      .map((college) => {
        const cutOffs = college.cutOff
          .split(",")
          .map((c) => parseInt(c.trim(), 10));
        const categoryCutoff = cutOffs[catIndex];

        const isEligible = parseInt(score) <= categoryCutoff;

        return isEligible
          ? {
              name: college.name,
              slug: college.slug,
              year: college.year,
              location: college.location,
              phone: college.phone,
              email: college.email,
              nirfRanking: college.nirfRanking,
              imageUrl: college.imageUrl,
              logoUrl: college.logoUrl,
              cutOff: college.cutOff,
              eligible: "Eligible",
              _id: college._id,
            }
          : null;
      })
      .filter((college) => college !== null);

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
      {/* Loading */}
      {isFetching ? (
        <div className="text-gray-500 text-lg">Loading colleges...</div>
      ) : (
        <>
          {/* Prediction Results */}
          {predictedColleges.length > 0 && (
            <section className="w-full max-w-6xl md:mb-20 md:mb-10 mb-6">
              <h2 className="text-2xl font-bold text-green-700 text-center">
                Predicted Colleges
              </h2>
              <p className="md:text-xl text-md text-gray-600 md:mb-10 mb-6 text-center">
                Based on your score: <strong>{score}</strong>, CSE in these
                colleges are :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {predictedColleges.map((college, index) => (
                  <div
                    key={index}
                    className="flex flex-col h-full p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-gray-200"
                  >
                    <div className="flex flex-col items-center">
                      {/* College Logo */}
                      <img
                        src={college.logoUrl || "/logo.png"}
                        alt={`Logo`}
                        className="w-25 h-25"
                      />

                      {/* College Name */}
                      <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2 text-center line-clamp-2">
                        {college.name}
                      </h3>

                      {/* Location */}
                      <p className="text-sm text-gray-600 mb-2">
                        {college.location}
                      </p>
                    </div>

                    {/* Cut-off Section */}
                    <div className="text-sm text-gray-700 mb-3">
                      <p className="font-semibold text-gray-600">
                        Cut-off Ranks:
                      </p>
                      <ul className="pl-4 list-disc space-y-1 mt-1 flex">
                        {college.cutOff
                          .split(",")
                          .filter((c) => c.trim().length > 0)
                          .map((cut, idx) => (
                            <li key={idx} className="text-sm text-gray-800 pr-5">
                              {cut.trim()}
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* Facilities (optional) */}
                    {college.facilities && (
                      <div className="mb-3">
                        <p className="font-semibold text-gray-600 text-sm mb-1">
                          Facilities:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {college.facilities
                            .split(",")
                            .map((facility, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                              >
                                {facility.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Eligibility */}
                    <p
                      className={`mt-auto font-semibold text-sm ${
                        college.eligible === "Eligible"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {college.eligible}
                    </p>

                    {/* View Details Button */}
                    <Link
                      href={`/colleges/${college.slug}`}
                      className="mt-3 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition"
                    >
                      View Details →
                    </Link>
                  </div>
                ))}
              </div>

              <p className="md:text-xl text-md text-gray-600 md:mt-10 mt-4 text-center">
                {predictedColleges.length > 8 ? "more Colleges..." : ""}
              </p>
            </section>
          )}

          {/* Previous Year Cut-offs */}
          <section className="w-full max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center md:mb-10 mb-3">
              Previous Year Cut-offs
            </h2>

            <p className="text-gray-700 text-xs md:text-sm italic">
              * Below are the JOSAA 2024 round 5 closing ranks for male-only
              candidates, specific to the CSE (B.Tech) program.
            </p>
            <p className="text-gray-700 text-xs md:text-sm mb-4 italic">
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
                        <td className="md:px-6 px-4 md:py-4 py-2 text-xs md:text-sm">
                          {college.name}
                        </td>
                        <td className="md:px-6 px-4 md:py-4 py-2 text-xs md:text-sm">
                          {college.year || 2024}
                        </td>
                        <td className="md:px-6 px-4 md:py-4 py-2 text-xs md:text-sm">
                          <Table
                            // head={["Category", "Cut Offs"]}
                            rows={[
                              [
                                <ul key="category-list">
                                  {[
                                    "General",
                                    "OBC-NCL",
                                    "G-EWS",
                                    "SC",
                                    "ST",
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
