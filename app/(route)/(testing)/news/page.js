"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const NewsPage = () => {
  const searchParams = useSearchParams();
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news?page=${page}&category=${category}`);
      if (!res.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await res.json();
      setNewsData((prev) => [...prev, ...data.data]);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect hook to fetch news when category or page changes
  useEffect(() => {
    fetchNews();
  }, [category, page]); // Add category and page as dependencies

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // Reset to the first page when category changes
    setNewsData([]); // Clear current news data
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Latest Education News
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center mb-10">
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="college">College News</option>
          <option value="exam">Exam Updates</option>
          <option value="scholarship">Scholarships</option>
        </select>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((news) => (
          <div
            key={news._id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200 p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {news.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                {news.description}
              </p>
            </div>

            <div className="mt-auto flex justify-between items-center">
              <a
                href={news.sourceURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Reference
              </a>
              <Link
                href={`/news/${news._id}`}
                className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setPage(page + 1)}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

// Wrap the entire component in Suspense
export default function NewsPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsPage />
    </Suspense>
  );
}
