'use client';

import { useState } from "react";

function Page() {  // Change 'page' to 'Page'
  const [score, setScore] = useState("");
  const [predictedResults, setPredictedResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Historical cutoff data
  const cutOff = [
    { year: "2024", general: "200", obc: "180", sc: "160", st: "150" },
    { year: "2023", general: "190", obc: "170", sc: "150", st: "140" },
    { year: "2022", general: "195", obc: "175", sc: "155", st: "145" },
    { year: "2021", general: "180", obc: "160", sc: "140", st: "130" },
  ];

  const handleRankPrediction = (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state

    // Simulate rank prediction calculation
    setTimeout(() => {
      const predictedRanks = cutOff.map((data) => ({
        year: data.year,
        name: `College XYZ ${data.year}`,
        general: calculateRank(score, data.general),
        obc: calculateRank(score, data.obc),
        sc: calculateRank(score, data.sc),
        st: calculateRank(score, data.st),
      }));
      
      setPredictedResults(predictedRanks);
      setLoading(false);  // Stop loading after results
    }, 1000);  // Simulate a delay for API call
  };

  // Simple rank prediction based on cutoff
  const calculateRank = (score, cutoff) => {
    return score >= cutoff ? Math.floor(Math.random() * 1000) + 1 : "Not eligible";
  };

  return (
    <div className="college-profile p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-center mb-4">Admission Cutoff</h3>
      
      <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg mb-6">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">General</th>
            <th className="px-4 py-2">OBC</th>
            <th className="px-4 py-2">SC</th>
            <th className="px-4 py-2">ST</th>
          </tr>
        </thead>
        <tbody>
          {cutOff.map((data) => (
            <tr key={data.year} className="text-center">
              <td className="px-4 py-2">{data.year}</td>
              <td className="px-4 py-2">{data.general}</td>
              <td className="px-4 py-2">{data.obc}</td>
              <td className="px-4 py-2">{data.sc}</td>
              <td className="px-4 py-2">{data.st}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="rank-predictor-form">
        <h3 className="text-xl font-semibold mb-3">Rank Predictor</h3>
        <form onSubmit={handleRankPrediction} className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Enter Your Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="mt-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict My Rank"}
          </button>
        </form>

        <div className="predicted-results mt-6">
          {predictedResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predictedResults.map((college, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white shadow-lg">
                  <h4 className="text-xl font-semibold">{college.name}</h4>
                  <p><strong>General Rank:</strong> {college.general}</p>
                  <p><strong>OBC Rank:</strong> {college.obc}</p>
                  <p><strong>SC Rank:</strong> {college.sc}</p>
                  <p><strong>ST Rank:</strong> {college.st}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;  // Change 'page' to 'Page'
