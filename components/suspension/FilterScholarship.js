"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";

function FilterScholarship() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const tagFilter = searchParams.get("tag") || "scholarship";
  const typeFilter = searchParams.get("type") || "";

  useEffect(() => {
    async function fetchPosts() {
      const url = new URL("/api/posts", window.location.href);
      if (tagFilter) url.searchParams.append("tag", tagFilter);
      if (typeFilter) url.searchParams.append("type", typeFilter);

      const res = await fetch(url.toString());
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, [tagFilter, typeFilter]);

  function updateFilter(type, value) {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    window.location.href = `/insights?${params.toString()}`;
  }

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Scholarship Updates
        </h1>
        <p className="text-gray-500 text-lg">
          Get the latest <strong>News, Updates, Notice and Blogs</strong> on
          scholarships across India.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 hidden">
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
      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        Total Scholarship Updates: {posts.length}
      </div>

      {/* Loading Indicator */}
      {loading && <div className="text-center p-30">Loading...</div>}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(posts) &&
          posts.map((item) => (
            <Link key={item._id} href={`/insights/${item.slug}`}>
              <div className="border rounded-lg shadow-md p-5 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={500}
                  height={500}
                  className=""
                />
                <h2 className="text-xl font-bold text-blue-700 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {item.summary?.slice(0, 120)}...
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Level:</span>{" "}
                  {item.tags || "All"}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Type:</span>{" "}
                  {item.type || "N/A"}
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

export default FilterScholarship;
