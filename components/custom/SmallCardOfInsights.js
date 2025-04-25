"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

function SmallCardOfInsights() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  return (
    <section>
      {loading ? (
        <div className="text-center p-30">
          Loading...
        </div>
      ) : posts.length === 0 ? (
        <p className="text-gray-600">
          No posts found for the selected filters.
        </p>
      ) : (
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white">
          {Array.isArray(posts) &&
            posts.map((item) => (
              <Link key={item._id} href={`/insights/${item.slug}`}>
                <div className="border rounded-lg shadow-md p-5 hover:shadow-lg hover:scale-[1.01] transition-transform cursor-pointer">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="mx-auto h-20"
                  />
                  <h2 className="text-md font-bold text-blue-700 mb-2">
                    {item.title?.slice(0, 30)+"..."}
                  </h2>
                  <p className="text-gray-600 text-xs mb-2">
                    {item.summary?.slice(0, 120)}...
                  </p>
                  <p className="text-sm text-gray-500 flex justify-between">
                    <span className="font-medium">
                      Tag:{item.tags || "All"}
                    </span>
                    <span className="font-medium">
                      Type:
                      {item.type || "N/A"}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </section>
  );
}

export default SmallCardOfInsights;
