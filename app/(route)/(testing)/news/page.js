"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NewsPage() {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchNews = async (selectedCategory) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news?page=1&category=${selectedCategory}`);
      const data = await res.json();
      setNewsData(data.data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const categories = [
    { label: "All", value: "all" },
    { label: "College News", value: "college" },
    { label: "Exam Updates", value: "exam" },
    { label: "Scholarships", value: "scholarship" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
        Education News & Updates
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              category === cat.value
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* News Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-center col-span-full text-gray-500">Loading...</p>
          ) : newsData.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No news found in this category.
            </p>
          ) : (
            newsData.map((news) => (
              <div
                key={news._id}
                className="bg-white border rounded-xl shadow hover:shadow-md transition p-4 flex flex-col"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {news.description}
                  </p>
                </div>
                <div className="mt-auto flex justify-between items-center pt-4 border-t">
                  <a
                    href={news.sourceURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Source
                  </a>
                  <Link
                    href={`/news/${news._id}`}
                    className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Advertisement & Promotions */}
        <div className="hidden lg:block">
          <div className="bg-white border rounded-xl shadow p-4 mb-6">
            <h4 className="text-md font-bold text-gray-800 mb-2">Promotions</h4>
            <ul className="text-sm text-blue-700 list-disc list-inside space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Top Engineering Colleges in India 2025
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  How to Crack JEE Advanced – Strategy Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Free Counseling by Experts
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl shadow p-4">
            <h4 className="text-md font-bold text-blue-700 mb-2">Advertisement</h4>
            <img
              src="/ads/sample-ad.jpg"
              alt="Ad Banner"
              className="rounded-lg w-full h-auto object-cover"
            />
            <p className="text-xs text-gray-500 mt-2">Sponsored Content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
