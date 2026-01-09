"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function SmallCardOfInsights() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  /* ================= FETCH POSTS ================= */
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        const json = await res.json();
        setPosts(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  /* ================= AUTO SCROLL (MOBILE) ================= */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || posts.length === 0) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: 280, behavior: "smooth" });

      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [posts]);

  const latestPosts = posts.slice(0, 6);

  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <section>
      {/* ================= MOBILE: HORIZONTAL SCROLL ================= */}
      <div
        ref={scrollContainerRef}
        className="
          md:hidden flex gap-4 overflow-x-auto px-2 pb-4
          scroll-smooth scrollbar-hide
        "
      >
        {latestPosts.map((post) => (
          <Link
            key={post._id}
            href={`/insights/${post.slug}`}
            className="
              min-w-[260px] max-w-[260px] flex-shrink-0
              group rounded-xl border border-[var(--border)]
              bg-[var(--background)] shadow-sm overflow-hidden
            "
          >
            {/* Image */}
            {post.hero?.image && (
              <div className="relative h-28">
                <Image
                  src={post.hero.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-3">
              <p className="text-xs text-blue-600 font-semibold uppercase">
                {post.category?.replace("-", " ")}
              </p>

              <h3 className="text-sm font-semibold line-clamp-2 mt-1">
                {post.title}
              </h3>

              <p className="text-[11px] text-gray-500 mt-1">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ================= DESKTOP: GRID ================= */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestPosts.map((post) => (
          <Link
            key={post._id}
            href={`/insights/${post.slug}`}
            className="
              group relative rounded-xl border border-[var(--border)]
              bg-[var(--background)] shadow-sm overflow-hidden
              transition hover:shadow-lg
            "
          >
            {/* Image (hide on hover) */}
            {post.hero?.image && (
              <div className="relative h-40 transition-opacity duration-300 group-hover:opacity-0">
                <Image
                  src={post.hero.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Hover Content */}
            <div
              className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition duration-300 p-5 flex flex-col justify-center
              "
            >
              <p className="text-xs text-blue-600 font-semibold uppercase">
                {post.category?.replace("-", " ")}
              </p>

              <h3 className="text-sm font-semibold mt-2 line-clamp-2">
                {post.title}
              </h3>

              {post.summary?.lead && (
                <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                  {post.summary.lead}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-3">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SmallCardOfInsights;
