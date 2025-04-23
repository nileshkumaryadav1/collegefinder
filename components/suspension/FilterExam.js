"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

function FilterExam() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const tagFilter = searchParams.get("tag") || "exam";
  const typeFilter = searchParams.get("type") || "";

  useEffect(() => {
    async function fetchPosts() {
      try {
        const url = new URL("/api/posts", window.location.href);
        if (tagFilter) url.searchParams.append("tag", tagFilter);
        if (typeFilter) url.searchParams.append("type", typeFilter);

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
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    window.location.href = `/insights?${params.toString()}`;
  }

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Head>
        <title>Exam Insights - Latest News, Updates & Blogs</title>
        <meta
          name="description"
          content="Stay up to date with the latest exam-related news, blogs, and updates in India. Find resources, tips, and important exam announcements."
        />
        <meta
          name="keywords"
          content="Exam News, Exam Updates, Exam Blogs, Entrance Exams, Education News"
        />
        <meta property="og:title" content="Exam Insights - Latest News & Blogs" />
        <meta
          property="og:description"
          content="Explore the most recent updates, blogs, and notices related to competitive and college exams across India."
        />
        <meta
          property="og:image"
          content="https://your-domain.com/og-exams.jpg"
        />
        <meta
          property="og:url"
          content="https://your-domain.com/find-news/exams"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div
        className={`min-h-screen px-4 md:py-8 py-4 md:px-10 lg:px-20 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Exam Insights
          </h1>
          <p className="text-gray-500 text-lg mb-2">
            Latest <strong>Notice, Update, News & Blogs</strong> on Exams
          </p>
        </header>

        {/* Filters (Optional - hidden by default) */}
        <div className="hidden">
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
          <p>Total Exam News: {posts.length}</p>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-center py-8 text-lg text-blue-600 font-medium">
            Loading exam updates...
          </p>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            Array.isArray(posts) &&
            posts.map((item) => (
              <Link key={item._id} href={`/insights/${item.slug}`}>
                <div className="border rounded-lg shadow-md p-5 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer bg-white">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="mb-4 rounded-md w-full h-40 object-cover"
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

        {/* Promo Section */}
        <div className="bg-yellow-500 text-black text-center py-6 my-10 rounded-lg shadow-lg">
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
    </>
  );
}

export default FilterExam;
