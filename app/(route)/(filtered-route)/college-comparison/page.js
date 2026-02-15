"use client";

import { useEffect, useState } from "react";

function parseNumber(value) {
  if (!value) return 0;
  return Number(
    value
      .toString()
      .replace(/[^0-9.]/g, "")
  );
}

export default function CollegeComparison() {
  const [colleges, setColleges] = useState([]);
  const [college1, setCollege1] = useState("");
  const [college2, setCollege2] = useState("");
  const [comparisonData, setComparisonData] = useState([]);
  const [winnerId, setWinnerId] = useState(null);
  const [scoreBoard, setScoreBoard] = useState({});

  // Fetch colleges
  useEffect(() => {
    async function fetchColleges() {
      const res = await fetch("/api/colleges");
      const data = await res.json();
      setColleges(data.colleges || []);
    }
    fetchColleges();
  }, []);

  const handleCompare = async () => {
    if (!college1 || !college2 || college1 === college2) return;

    const url = new URL("/api/colleges/compare", window.location.origin);
    url.searchParams.append("collegeIds", college1);
    url.searchParams.append("collegeIds", college2);

    const res = await fetch(url.toString());
    const data = await res.json();

    setComparisonData(data || []);
    calculateWinner(data || []);
  };

  const calculateWinner = (data) => {
    if (data.length !== 2) return;

    const [c1, c2] = data;

    let scores = {
      [c1._id]: 0,
      [c2._id]: 0,
    };

    // NIRF (lower better)
    if (c1.nirfRanking && c2.nirfRanking) {
      if (c1.nirfRanking < c2.nirfRanking)
        scores[c1._id] += 3;
      else scores[c2._id] += 3;
    }

    // Average package (higher better)
    const avg1 = parseNumber(c1.placements?.BTech?.average);
    const avg2 = parseNumber(c2.placements?.BTech?.average);

    if (avg1 > avg2) scores[c1._id] += 3;
    else if (avg2 > avg1) scores[c2._id] += 3;

    // Highest package
    const high1 = parseNumber(c1.placements?.BTech?.highest);
    const high2 = parseNumber(c2.placements?.BTech?.highest);

    if (high1 > high2) scores[c1._id] += 2;
    else if (high2 > high1) scores[c2._id] += 2;

    // Fees (lower better)
    const fee1 = parseNumber(c1.fees?.total);
    const fee2 = parseNumber(c2.fees?.total);

    if (fee1 < fee2) scores[c1._id] += 1;
    else if (fee2 < fee1) scores[c2._id] += 1;

    // Established (older better)
    if (c1.establishedYear < c2.establishedYear)
      scores[c1._id] += 1;
    else scores[c2._id] += 1;

    setScoreBoard(scores);

    const winner =
      scores[c1._id] > scores[c2._id]
        ? c1._id
        : scores[c2._id] > scores[c1._id]
        ? c2._id
        : null;

    setWinnerId(winner);
  };

  const breakdownText = () => {
    if (!winnerId || comparisonData.length !== 2) return "";

    const winner = comparisonData.find((c) => c._id === winnerId);
    const loser = comparisonData.find((c) => c._id !== winnerId);

    return `${winner.name} outperforms ${loser.name} based on key metrics like NIRF ranking, placement performance, fee structure, and historical reputation. With a stronger overall score (${scoreBoard[winnerId]} points), it stands as the better choice in this comparison. However, students should also consider location, specialization, and personal preferences before making a final decision.`;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        College Comparison Tool
      </h1>

      {/* Selectors */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        <select
          value={college1}
          onChange={(e) => setCollege1(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-80"
        >
          <option value="">Select College 1</option>
          {colleges.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={college2}
          onChange={(e) => setCollege2(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-80"
        >
          <option value="">Select College 2</option>
          {colleges.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCompare}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Compare
        </button>
      </div>

      {/* Table */}
      {comparisonData.length === 2 && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Criteria</th>
                  {comparisonData.map((c) => (
                    <th
                      key={c._id}
                      className={`border p-3 ${
                        winnerId === c._id
                          ? "bg-green-200 font-bold"
                          : ""
                      }`}
                    >
                      {c.name}
                      {winnerId === c._id && " 🏆"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">NIRF Rank</td>
                  <td className="border p-3">{comparisonData[0].nirfRanking}</td>
                  <td className="border p-3">{comparisonData[1].nirfRanking}</td>
                </tr>

                <tr>
                  <td className="border p-3">B.Tech Avg Package</td>
                  <td className="border p-3">{comparisonData[0].placements?.BTech?.average}</td>
                  <td className="border p-3">{comparisonData[1].placements?.BTech?.average}</td>
                </tr>

                <tr>
                  <td className="border p-3">B.Tech Highest</td>
                  <td className="border p-3">{comparisonData[0].placements?.BTech?.highest}</td>
                  <td className="border p-3">{comparisonData[1].placements?.BTech?.highest}</td>
                </tr>

                <tr>
                  <td className="border p-3">Total Fees</td>
                  <td className="border p-3">{comparisonData[0].fees?.total}</td>
                  <td className="border p-3">{comparisonData[1].fees?.total}</td>
                </tr>

                <tr>
                  <td className="border p-3">Established</td>
                  <td className="border p-3">{comparisonData[0].establishedYear}</td>
                  <td className="border p-3">{comparisonData[1].establishedYear}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Breakdown Paragraph */}
          {winnerId && (
            <div className="mt-8 p-6 bg-yellow-100 rounded-xl">
              <h2 className="text-xl font-semibold mb-3">
                Comparison Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {breakdownText()}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
