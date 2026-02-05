"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MAX_COMPARE = 3;

export default function CollegeComparison() {
  const [colleges, setColleges] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ==============================
  // Fetch colleges
  // ==============================
  useEffect(() => {
    async function fetchColleges() {
      try {
        setLoading(true);
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(data.colleges || []);
      } catch {
        setMessage("Failed to load colleges.");
      } finally {
        setLoading(false);
      }
    }
    fetchColleges();
  }, []);

  // ==============================
  // Select college
  // ==============================
  const handleSelect = (e) => {
    const id = e.target.value;
    e.target.value = "";

    if (!id) return;

    if (selectedColleges.includes(id)) {
      setMessage("College already selected.");
      return;
    }

    if (selectedColleges.length >= MAX_COMPARE) {
      setMessage(`Maximum ${MAX_COMPARE} colleges allowed.`);
      return;
    }

    setMessage("");
    setSelectedColleges((prev) => [...prev, id]);
  };

  // ==============================
  // Compare
  // ==============================
  const handleCompare = async () => {
    if (selectedColleges.length < 2) {
      setMessage("Select at least two colleges to compare.");
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
    } catch {
      setMessage("Comparison failed.");
    } finally {
      setLoading(false);
    }
  };

  const removeCollege = (id) => {
    setSelectedColleges((prev) => prev.filter((c) => c !== id));
    setComparisonData([]);
  };

  // ==============================
  // Winner (NIRF)
  // ==============================
  const winnerCollege =
    comparisonData.length > 0
      ? [...comparisonData]
          .filter((c) => typeof c.nirfRanking === "number")
          .sort((a, b) => a.nirfRanking - b.nirfRanking)[0]
      : null;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Compare Colleges
      </h1>

      {/* Selector */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
        <select
          onChange={handleSelect}
          className="w-full md:w-96 p-3 border rounded-xl"
        >
          <option value="">Select college</option>
          {colleges.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCompare}
          disabled={loading || selectedColleges.length < 2}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50"
        >
          Compare
        </button>
      </div>

      {message && (
        <p className="text-center text-sm text-red-500 mb-6">{message}</p>
      )}

      {/* Selected */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {selectedColleges.map((id) => {
          const c = colleges.find((x) => x._id === id);
          return (
            <span
              key={id}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-sm"
            >
              {c?.shortName || c?.name}
              <button
                onClick={() => removeCollege(id)}
                className="text-red-600 font-bold"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>

      {/* Winner */}
      {winnerCollege && (
        <div className="bg-yellow-400 text-black p-5 rounded-xl text-center mb-8">
          <h2 className="text-xl font-bold">Best Ranked (NIRF)</h2>
          <p>{winnerCollege.name} — Rank #{winnerCollege.nirfRanking}</p>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {comparisonData.map((c) => (
          <div
            key={c._id}
            className="bg-white p-6 rounded-2xl border shadow hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              {c.logoUrl && (
                <Image
                  src={c.logoUrl}
                  alt={c.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <h2 className="font-semibold text-lg">{c.name}</h2>
            </div>

            <div className="space-y-2 text-sm">
              <p><strong>Type:</strong> {c.type}</p>
              <p><strong>Location:</strong> {c.city}, {c.state}</p>
              <p><strong>Established:</strong> {c.establishedYear}</p>
              <p><strong>NIRF Rank:</strong> {c.nirfRanking ?? "N/A"}</p>
              <p><strong>Total Fees:</strong> {c.fees?.total ?? "N/A"}</p>

              <hr />

              <p><strong>B.Tech Highest:</strong> {c.placements?.BTech?.highest ?? "N/A"}</p>
              <p><strong>B.Tech Average:</strong> {c.placements?.BTech?.average ?? "N/A"}</p>
              <p><strong>M.Tech Highest:</strong> {c.placements?.MTech?.highest ?? "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
