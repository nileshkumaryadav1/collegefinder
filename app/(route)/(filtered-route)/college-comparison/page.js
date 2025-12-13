"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CollegeComparison = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // Fetch colleges
  // ==============================
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(data.colleges || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load colleges.");
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  // ==============================
  // Select college
  // ==============================
  const handleSelectCollege = (e) => {
    const id = e.target.value;
    if (id && !selectedColleges.includes(id)) {
      setSelectedColleges((prev) => [...prev, id]);
    }
  };

  // ==============================
  // Compare
  // ==============================
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
      setComparisonData(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch comparison data.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCollege = (id) => {
    setSelectedColleges((prev) => prev.filter((cid) => cid !== id));
  };

  // ==============================
  // Winner detection (NIRF ranking)
  // Lower rank = better
  // ==============================
  const winnerCollege =
    comparisonData.length > 0
      ? [...comparisonData]
          .filter((c) => typeof c.ranking === "number")
          .sort((a, b) => a.ranking - b.ranking)[0]
      : null;

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        College Comparison
      </h1>

      {/* Selector */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <select
          onChange={handleSelectCollege}
          className="w-full md:w-72 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
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
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Comparing..." : "Compare"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-500 text-center mb-6">{error}</div>
      )}

      {/* Selected colleges pills */}
      {selectedColleges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {selectedColleges.map((id) => {
            const college = colleges.find((c) => c._id === id);
            return (
              <div
                key={id}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {college?.name}
                <button
                  onClick={() => handleRemoveCollege(id)}
                  className="font-bold text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Winner Banner */}
      {winnerCollege && (
        <div className="mb-10 animate-fade-in">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-3xl font-bold">🏆 Winner</h2>
            <p className="mt-2 text-lg">
              <strong>{winnerCollege.name}</strong>
              <span className="block text-sm opacity-90">
                Best NIRF Ranking: #{winnerCollege.ranking}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Comparison Cards */}
      {comparisonData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comparisonData.map((college) => {
            const isWinner = winnerCollege?._id === college._id;

            return (
              <div
                key={college._id}
                className={`relative p-6 rounded-2xl bg-white transition-all duration-500 animate-slide-up
                ${
                  isWinner
                    ? "border-2 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.6)] scale-[1.03]"
                    : "border border-gray-200 shadow-lg hover:shadow-2xl"
                }`}
              >
                {isWinner && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow">
                    🏆 Best Ranked
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center mb-4">
                  {college.logoUrl && (
                    <Image
                      src={college.logoUrl}
                      alt={college.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-3"
                    />
                  )}
                  <h2 className="text-xl font-semibold">{college.name}</h2>
                </div>

                {/* Image */}
                {college.imageUrl && (
                  <Image
                    src={college.imageUrl}
                    alt={college.name}
                    width={400}
                    height={300}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                )}

                {/* Info */}
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>NIRF Rank:</strong> {college.ranking ?? "N/A"}</p>
                  <p><strong>Fees:</strong> {college.fees ?? "N/A"}</p>
                  <p><strong>Highest Package:</strong> {college.highestPlacement ?? "N/A"}</p>
                  <p><strong>Average Package:</strong> {college.averagePlacement ?? "N/A"}</p>
                  <p><strong>Location:</strong> {college.location ?? "N/A"}</p>
                </div>

                {/* Cutoffs */}
                {college.cutoffs?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-bold text-blue-600 mb-2">Cut-offs</h3>
                    <ul className="list-disc list-inside text-sm">
                      {college.cutoffs.map((cutoff, i) => (
                        <li key={i}>
                          {cutoff.branch} – {cutoff.rank}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Comparison Table */}
      {comparisonData.length > 1 && (
        <div className="mt-14 overflow-x-auto border border-[var(--border)] rounded-xl">
          <h2 className="text-2xl font-bold text-center text-blue-700 my-6">
            Detailed Comparison
          </h2>

          <table className="min-w-full border border-[var(--border)] rounded-xl overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Criteria</th>
                {comparisonData.map((college) => (
                  <th key={college._id} className="p-3 text-center">
                    {college.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-[var(--background)]">
              {[
                ["NIRF Rank", "ranking", true],
                ["Fees", "fees"],
                ["Highest Package", "highestPlacement"],
                ["Average Package", "averagePlacement"],
                ["Location", "location"],
              ].map(([label, key, highlight]) => (
                <tr key={key} className="border-t">
                  <td className="p-3 font-semibold">{label}</td>
                  {comparisonData.map((college) => (
                    <td
                      key={college._id}
                      className={`p-3 text-center ${
                        highlight &&
                        winnerCollege?._id === college._id
                          ? "bg-yellow-100 font-bold"
                          : ""
                      }`}
                    >
                      {college[key] ?? "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CollegeComparison;
