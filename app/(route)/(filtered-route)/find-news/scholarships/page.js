"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ScholarshipsNewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarshipNews = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/news");
        const data = await res.json();

        // Ensure the response is an array
        const newsArray = Array.isArray(data) ? data : data.news || [];

        setNewsItems(newsArray);
        setFilteredNews(newsArray);
      } catch (error) {
        console.error("Error fetching scholarship news:", error);
        setNewsItems([]);
        setFilteredNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarshipNews();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredNews(newsItems);
    } else {
      const filtered = newsItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Scholarship News Updates
        </h1>
        <p className="text-gray-500 text-lg">
          Get the latest news and updates on scholarships across India.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search scholarship news..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-2/3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* News Count */}
      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        Total News Updates: {filteredNews.length}
      </div>

      {/* Loading Indicator */}
      {loading && <div className="text-center p-30">Loading...</div>}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(filteredNews) &&
          filteredNews.map((item) => (
            <Link key={item._id} href={`/scholarships/${item._id}`}>
              <div className="border rounded-lg shadow-md p-5 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer">
                <h2 className="text-xl font-bold text-blue-700 mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {item.description?.slice(0, 120)}...
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Level:</span>{" "}
                  {item.level || "All"}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Deadline:</span>{" "}
                  {item.deadline || "N/A"}
                </p>
              </div>
            </Link>
          ))}
      </div>

      {/* Promotional Section */}
      <div className="bg-yellow-400 text-black text-center py-4 mt-10 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">
          Do Not Miss Out on Latest Scholarship Alerts!
        </h2>
        <p className="text-sm mt-2 mb-4">
          Subscribe now to get regular scholarship updates straight to your
          inbox.
        </p>
        <Link
          href="/sponsors"
          className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  );
}
