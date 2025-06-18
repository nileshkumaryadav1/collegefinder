"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function SmallCardOfInsights() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

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
      ) : posts.length === 0 ? (
        <p className="text-gray-600">No posts found for the selected filters.</p>
      ) : (
        <>
          {/* Mobile View */}
          <div
            ref={scrollContainerRef}
            className="flex md:hidden gap-4 overflow-x-auto px-2 pb-4 scroll-smooth bg-gray-50"
          >
            {latestPosts.map((item) => (
              <Link key={item._id} href={`/insights/${item.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-[280px] flex-shrink-0 border rounded-lg shadow-md p-5 cursor-pointer bg-white"
                >
                  <Image
                    src={item.thumbnail}
                    alt="Thumbnail"
                    width={200}
                    height={200}
                    className="mx-auto h-20"
                  />
                  <h2 className="text-sm md:text-md font-bold text-blue-700 mb-2">
                    {item.title?.slice(0, 30) + "..."}
                  </h2>
                  <p className="text-gray-600 text-xs mb-2 text-justify">
                    {item.summary?.slice(0, 100)}...
                  </p>
                  <p className="text-sm text-gray-500 flex justify-between">
                    <span className="font-medium">Tag: {item.tags || "All"}</span>
                    <span className="font-medium">Type: {item.type || "N/A"}</span>
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50">
            {latestPosts.map((item) => (
              <Link key={item._id} href={`/insights/${item.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="border rounded-lg shadow-md p-5 cursor-pointer bg-white"
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="mx-auto h-20"
                  />
                  <h2 className="text-md font-bold text-blue-700 mb-2">
                    {item.title?.slice(0, 30) + "..."}
                  </h2>
                  <p className="text-gray-600 text-xs mb-2">
                    {item.summary?.slice(0, 120)}...
                  </p>
                  <p className="text-sm text-gray-500 flex justify-between">
                    <span className="font-medium">Tag: {item.tags || "All"}</span>
                    <span className="font-medium">Type: {item.type || "N/A"}</span>
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
