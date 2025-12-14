"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function SmallCardOfInsights() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  /* ============================
     FETCH POSTS
  ============================ */
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        const json = await res.json();

        setPosts(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  /* ============================
     AUTO SCROLL
  ============================ */
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

  const latestPosts = posts.slice(0, 3);

  return (
    <section>
      {loading ? (
        <div className="text-center p-30">Loading...</div>
      ) : latestPosts.length === 0 ? (
        <p className="text-gray-600">
          No posts found for the selected filters.
        </p>
      ) : (
        <>
          {/* ================= MOBILE ================= */}
          <div
            ref={scrollContainerRef}
            className="flex md:hidden gap-4 overflow-x-auto px-2 pb-4 scroll-smooth bg-[var(--background)] text-[var(--foreground)]"
          >
            {latestPosts.map((item) => (
              <Link key={item._id} href={`/insights/${item.slug}`}>
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-[280px] flex-shrink-0 shadow-md p-5 cursor-pointer bg-white border border-[var(--border)] rounded-lg"
                >
                  {/* Hero Image */}
                  {item.hero?.image && (
                    <Image
                      src={item.hero.image}
                      alt={item.hero.imageAlt || item.title}
                      width={200}
                      height={200}
                      className="mx-auto h-20 object-cover"
                    />
                  )}

                  <h2 className="text-sm md:text-md font-bold text-blue-700 mb-2">
                    {item.title?.slice(0, 30)}...
                  </h2>

                  <p className="text-gray-600 text-xs mb-2 text-justify">
                    {item.summary?.lead}
                  </p>

                  <p className="text-sm text-gray-500 flex justify-between">
                    <span className="font-medium">
                      {item.category?.replace("-", " ")}
                    </span>
                    <span className="font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[var(--background)] text-[var(--foreground)]">
            {latestPosts.map((item) => (
              <Link key={item._id} href={`/insights/${item.slug}`}>
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-lg shadow-md p-5 cursor-pointer bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]"
                >
                  {item.hero?.image && (
                    <Image
                      src={item.hero.image}
                      alt={item.hero.imageAlt || item.title}
                      width={200}
                      height={200}
                      className="mx-auto h-20 object-cover"
                    />
                  )}

                  <h2 className="text-md font-bold text-blue-700 mb-2">
                    {item.title?.slice(0, 30)}...
                  </h2>

                  <p className="text-gray-600 text-xs mb-2">
                    {item.summary?.lead}
                  </p>

                  <p className="text-sm text-gray-500 flex justify-between">
                    <span className="font-medium">
                      {item.category?.replace("-", " ")}
                    </span>
                    <span className="font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default SmallCardOfInsights;
