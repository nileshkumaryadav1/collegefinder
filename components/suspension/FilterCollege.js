"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function FilterCollege() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const tagFilter = searchParams.get("tag") || "college";
  const typeFilter = searchParams.get("type") || "";

  useEffect(() => {
    async function fetchPosts() {
      const url = new URL("/api/posts", window.location.href);
      if (tagFilter) url.searchParams.append("tag", tagFilter);
      if (typeFilter) url.searchParams.append("type", typeFilter);

      try {
        const res = await fetch(url.toString());
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [tagFilter, typeFilter]);

  function updateFilter(type, value) {
    const params = new URLSearchParams(window.location.search);
    value ? params.set(type, value) : params.delete(type);
    window.location.href = `/insights?${params.toString()}`;
  }

  return (
    <div
      className={`min-h-screen px-4 md:py-10 py-6 md:px-10 lg:px-20 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">
          College Insights
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Stay updated with the latest{" "}
          <strong>News, Announcements, Updates & Blogs</strong> related to
          Indian colleges and universities.
        </p>
      </header>

      {/* Hidden Filters (could be made visible later) */}
      <div className="hidden mb-6">
        <select
          value={typeFilter}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="border px-4 py-2 rounded mr-4"
        >
          <option value="">All Types</option>
          <option value="blog">Blog</option>
          <option value="news">News</option>
          <option value="update">Update</option>
        </select>

        <select
          value={tagFilter}
          onChange={(e) => updateFilter("tag", e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Tags</option>
          <option value="college">College</option>
          <option value="exam">Exam</option>
          <option value="scholarship">Scholarship</option>
        </select>
      </div>

      {/* News Count */}
      <p className="text-center text-gray-500 mb-6">
        Total College Insights: {posts.length}
      </p>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 mb-8 animate-pulse">
          Loading news...
        </p>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((item) => (
          <Link key={item._id} href={`/insights/${item.slug}`}>
            <div className="border rounded-lg shadow-md p-5 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer">
              {item.thumbnail && (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-bold text-blue-700 mb-2 line-clamp-2">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                {item.summary?.slice(0, 120)}...
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  <span className="font-medium">Level:</span>{" "}
                  {item.tags || "All"}
                </p>
                <p>
                  <span className="font-medium">Type:</span>{" "}
                  {item.type || "N/A"}
                </p>
              </div>
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

export default FilterCollege;
