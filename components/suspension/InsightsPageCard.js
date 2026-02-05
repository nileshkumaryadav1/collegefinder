"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import DefaultLoading from "../loading/DefaultLoading";
import Image from "next/image";
import formatDate from "../small/DateFormatter";

export default function InsightsPageCard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const tagFilter = searchParams.get("tag") || "";
  const categoryFilter = searchParams.get("category") || "";

  /* ============================
     FETCH POSTS
  ============================ */
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);

      const url = new URL("/api/posts", window.location.origin);
      if (tagFilter) url.searchParams.set("tag", tagFilter);
      if (categoryFilter) url.searchParams.set("category", categoryFilter);

      try {
        const res = await fetch(url.toString());
        const data = await res.json();
        setPosts(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [tagFilter, categoryFilter]);

  /* ============================
     FILTER HANDLER
  ============================ */
  function updateFilter(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/insights?${params.toString()}`);
  }

  /* ============================
     UI
  ============================ */
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-20 py-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-700">
          Blogs & Updates
        </h1>
        <p className="text-gray-600 mt-1 max-w-2xl">
          Latest exam news, results, cutoffs, rankings, and college updates.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">
        <select
          value={categoryFilter}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="exam-news">Exam News</option>
          <option value="cutoff">Cutoff</option>
          <option value="result">Result</option>
          <option value="ranking">Ranking</option>
          <option value="comparison">Comparison</option>
          <option value="college-news">College News</option>
        </select>

        <select
          value={tagFilter}
          onChange={(e) => updateFilter("tag", e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Tags</option>
          <option value="college">College</option>
          <option value="exam">Exam</option>
          <option value="scholarship">Scholarship</option>
        </select>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Posts */}
        <div className="lg:col-span-3">
          {loading ? (
            <DefaultLoading />
          ) : posts.length === 0 ? (
            <p className="text-gray-500">
              No posts found for selected filters.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="border border-[var(--border)] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition">
                    {/* Hero Image */}
                    {post.hero?.image && (
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={post.hero.image}
                          alt={post.hero.imageAlt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 space-y-2">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        {post.category?.replace("-", " ")}
                      </span>

                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-700">
                        {post.title}
                      </h2>

                      {post.summary?.lead && (
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {post.summary.lead}
                        </p>
                      )}

                      <div className="text-xs text-gray-500 pt-2">
                        {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Popular Guides */}
          <div className="border rounded-2xl p-5 bg-white shadow-sm">
            <h4 className="font-bold mb-3">Popular Guides</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>
                <Link href="/colleges" className="hover:underline">
                  Top Engineering Colleges in India
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:underline">
                  JEE Advanced Preparation Strategy
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:underline">
                  Best Scholarships for Students
                </Link>
              </li>
            </ul>
          </div>

          {/* Ad */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <h4 className="font-bold text-blue-700 mb-2">Sponsored</h4>
            <Image
              src="/sponsors.jpg"
              alt="Advertisement"
              width={400}
              height={300}
              className="rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Sponsored Content</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
