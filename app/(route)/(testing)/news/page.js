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
      const url =
        selectedCategory === "all"
          ? `/api/news?page=1`
          : `/api/news?page=1&category=${selectedCategory}`;
      const res = await fetch(url);
      const data = await res.json();
      setNewsData(Array.isArray(data.data) ? data.data : []);
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
    { label: "College News", value: "College" },
    { label: "Exam Updates", value: "Exam" },
    { label: "Scholarships", value: "Scholarship" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:py-10 py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 text-center">
        Education News & Updates
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center gap-3 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              category === cat.value
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            aria-label={`Filter news by ${cat.label}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* News Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-center col-span-full text-gray-500">
              Loading news articles...
            </p>
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
                <div className="mb-3">
                  <Link href={`/news/${news._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:underline">
                      {news.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {news.description}
                  </p>
                </div>
                <div className="mt-auto flex justify-between items-center pt-4 border-t">
                  <a
                    href={news.sourceURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Source
                  </a>
                  <Link
                    href={`/news/${news._id}`}
                    className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar: Promotions + Ads */}
        <div className="lg:block">
          {/* Promotions */}
          <div className="bg-white border rounded-xl shadow p-5 mb-6">
            <h4 className="text-lg font-bold text-gray-800 mb-3">Promotions</h4>
            <ul className="text-sm text-blue-700 list-disc list-inside space-y-2">
              <li>
                <Link href="/colleges" className="hover:underline">
                  Top Engineering Colleges in India 2025
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:underline">
                  How to Crack JEE Advanced – Strategy Guide
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="hover:underline">
                  Free Counseling by Experts
                </Link>
              </li>
            </ul>
          </div>

          {/* Advertisement */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl shadow p-5">
            <h4 className="text-lg font-bold text-blue-700 mb-3">
              Advertisement
            </h4>
            <Link
              href="/sponsors"
              className="block hover:opacity-90 transition"
            >
              <img
                src="/sponsors.jpg"
                alt="Sponsored Ad"
                className="rounded-lg w-full h-auto object-cover"
              />
            </Link>
            <p className="text-xs text-gray-500 mt-2">Sponsored Content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
