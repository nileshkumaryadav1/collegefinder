"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import DefaultLoading from "../loading/DefaultLoading";
import Image from "next/image";

export default function InsightsPageCard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const tagFilter = searchParams.get("tag") || "";
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
    <div className="mx-auto p-4 bg-white md:px-20 px-4 md:py-8 py-4">
      <Head>
        <title>
          {typeFilter
            ? `${typeFilter[0].toUpperCase() + typeFilter.slice(1)}s`
            : "Insights"}{" "}
          - College Finder
        </title>
        <meta
          name="description"
          content={`Explore ${typeFilter || "all"} ${tagFilter ? tagFilter + " related" : ""} blog posts, news, and updates on College Finder.`}
        />
        <meta
          property="og:title"
          content="College Finder Blog, News & Updates"
        />
        <meta
          property="og:description"
          content="Stay up-to-date with the latest college news, updates, and blog posts on College Finder."
        />
      </Head>

      <h1 className="text-2xl font-bold text-blue-600">
        Insights - Blog, News & Updates
      </h1>

      <p className="text-gray-600 mb-4">
        Stay up-to-date with the latest college news, updates, and blog posts on
        College Finder.
      </p>

      {/* Filters */}
      <div className="mb-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Posts List */}
        {loading ? (
          <div className="lg:col-span-3">
            <DefaultLoading />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-600">
            No posts found for the selected filters.
          </p>
        ) : (
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {Array.isArray(posts) &&
              posts.map((item) => (
                <Link
                  key={item._id}
                  href={`/insights/${item.slug}`}
                  aria-label="View Post"
                >
                  <div className="border rounded-lg shadow-md p-5 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer">
                    <Image
                      src={item.thumbnail}
                      alt="Post Image"
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
                      <span className="font-medium">Tag :</span>{" "}
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
        )}

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
              <Image
                src="/sponsors.jpg"
                alt="Sponsored Ad"
                width={500}
                height={500}
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
