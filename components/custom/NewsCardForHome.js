"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function NewsCardForHome({ category }) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news?page=1&category=${category}`);
        const data = await res.json();
        setNews(data.data); // assuming your API returns data like { data: [...] }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [category]);

  if (loading) {
    return <p className="text-center py-10">Loading news...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news
          .filter((item) => item.category === category)
          .map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200 p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto flex justify-between items-center">
                <a
                  href={item.sourceURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Reference
                </a>
                <Link
                  href={`/news/${item._id}`}
                  className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
