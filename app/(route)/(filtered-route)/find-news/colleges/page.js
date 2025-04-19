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

        // Filter news containing the substring "colleges" (case-insensitive)
        const collegeNews = data.filter((item) =>
          item.title?.toLowerCase().includes("colleges") ||
          item.description?.toLowerCase().includes("colleges")
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
          College News
        </h1>
        <p className="text-gray-500 text-lg mb-4">
          Stay updated with the latest news and updates related to colleges.
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-3 w-2/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      {/* Total News Count */}
      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        <p>Total News Articles: {filteredNews.length}</p>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((news) => (
          <Link key={news._id} href={`/news/${news._id}`}>
            <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  {news.title}
                </h2>
                <p className="text-gray-600 mb-2">
                  {news.description?.slice(0, 100)}...
                </p>
                <p className="text-gray-500 text-sm">
                  Published on:{" "}
                  {news.date
                    ? new Date(news.date).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Promotion or Banner */}
      <div className="bg-yellow-500 text-black text-center py-4 my-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">
          Explore Top Colleges Now!
        </h2>
        <p className="text-sm mt-2 mb-4">
          Find the best college news, rankings, and more.
        </p>
        <a
          href="https://www.example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Explore Colleges
        </a>
      </div>
    </div>
  );
}

export default Page;
