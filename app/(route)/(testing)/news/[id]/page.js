"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function NewsDetailPage({ params: rawParams }) {
  const [params, setParams] = useState(null);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // Unwrap the async params
  useEffect(() => {
    const unwrapParams = async () => {
      const resolved = await rawParams;
      setParams(resolved);
    };
    unwrapParams();
  }, [rawParams]);

  useEffect(() => {
    if (!params) return;

    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news/${params.id}`);
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [params]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center text-gray-500 text-lg">
        Loading news...
      </div>
    );
  }

  if (!news || !news.title) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center text-red-500 text-lg">
        News not found.
      </div>
    );
  }

  return (
    <section className="bg-gray-100 md:py-10">
    <div className="max-w-4xl mx-auto px-6 md:py-10 py-5 md:px-10 bg-white rounded-2xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 leading-snug">
        {news.title}
      </h1>

      <div className="text-sm text-gray-500 space-y-1 mb-6 border-l-4 border-blue-500 pl-4">
        <p>
          <span className="font-medium text-gray-700">Category:</span>{" "}
          {news.category}
        </p>
        <p>
          <span className="font-medium text-gray-700">Published:</span>{" "}
          {new Date(news.publishedDate).toLocaleDateString()}
        </p>
        {news.sourceURL && (
          <p>
            <span className="font-medium text-gray-700">Source:</span>{" "}
            <a
              href={news.sourceURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {/* {news.sourceURL} */}
              Source
            </a>
          </p>
        )}
      </div>

      <div className="prose max-w-none prose-gray text-justify">{news.description}</div>

      <Link
        href="/news"
        className="text-sm text-blue-600 hover:text-blue-800 mt-3 transition-colors w-full btn btn-primary"
      >
        ← Back to News
      </Link>
    </div>
    </section>
  );
}
