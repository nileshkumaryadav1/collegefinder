"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
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

        // Filter news containing "colleges"
        const collegeNews = data.filter((item) =>
          ["title", "description"].some((key) =>
            item[key]?.toLowerCase().includes("colleges")
          )
        );

        setNewsItems(collegeNews);
        setFilteredNews(collegeNews);
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
    if (!query.trim()) {
      setFilteredNews(newsItems);
    } else {
      const lower = query.toLowerCase();
      const filtered = newsItems.filter((item) =>
        ["title", "description"].some((key) =>
          item[key]?.toLowerCase().includes(lower)
        )
      );
      setFilteredNews(filtered);
    }
  };

  return (
    <div
      className={`min-h-screen px-4 md:py-10 py-6 md:px-10 lg:px-20 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">
          College News & Updates
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Stay updated with the latest news and announcements related to Indian colleges and universities.
        </p>
      </header>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by title or description..."
          className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* News Count */}
      <p className="text-center text-gray-700 mb-6">
        Showing <span className="font-semibold">{filteredNews.length}</span>{" "}
        article{filteredNews.length !== 1 && "s"}
      </p>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-gray-500 mb-8 animate-pulse">
          Loading news...
        </p>
      )}

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((news) => (
          <Link key={news._id} href={`/news/${news._id}`}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between h-full cursor-pointer">
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {news.description}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-auto">
                Published on:{" "}
                {news.date
                  ? new Date(news.date).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Promotional Banner */}
      <div className="bg-blue-100 border border-blue-300 mt-12 rounded-xl p-6 text-center shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
          Explore Top Colleges Now!
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          Discover rankings, news, and admission tips tailored just for you.
        </p>
        <Link
          href="/colleges"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Explore Colleges
        </Link>
      </div>
    </div>
  );
}
