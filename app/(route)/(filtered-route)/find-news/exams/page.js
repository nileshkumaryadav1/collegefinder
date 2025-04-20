"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

function Page() {
  const [newsItems, setNewsItems] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/news");
        const data = await res.json();

        // Filter news containing "exam" in title or description
        const examNews = data.filter(
          (item) =>
            item.title?.toLowerCase().includes("exam") ||
            item.description?.toLowerCase().includes("exam")
        );

        setNewsItems(examNews);
        setFilteredNews(examNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredNews(newsItems);
    } else {
      const filtered = newsItems.filter(
        (item) =>
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className={`min-h-screen px-4 md:py-8 py-4 md:px-10 lg:px-20 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Exam News & Updates
        </h1>
        <p className="text-gray-500 text-lg mb-4">
          Latest updates on competitive and entrance exams. Filter by keyword.
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Exam News..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-3 w-2/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      {/* News Count */}
      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        <p>Total Exam News: {filteredNews.length}</p>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((item) => (
          <Link key={item._id} href={`/news/${item._id}`}>
            <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-600">
                  {item.title}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Ad Banner */}
      <div className="bg-yellow-500 text-black text-center py-4 my-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">
          Special Alert: Prepare for Your Upcoming Exams!
        </h2>
        <p className="text-sm mt-2 mb-4">
          Get top study materials and tips curated by toppers!
        </p>
        <Link
          href="/sponsors"
          className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Start Now
        </Link>
      </div>
    </div>
  );
}

export default Page;
