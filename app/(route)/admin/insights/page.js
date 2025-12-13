"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =============================
     FETCH POSTS
  ============================== */
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        const json = await res.json();

        if (json.success) {
          setPosts(json.data); // ✅ CORRECT
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  /* =============================
     DELETE POST
  ============================== */
  async function deletePost(slug) {
    if (!confirm("Delete this post?")) return;

    await fetch(`/api/posts/${slug}`, { method: "DELETE" });

    // Optimistic UI update
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  /* =============================
     UI STATES
  ============================== */
  if (loading) {
    return <div className="p-10 text-gray-500">Loading posts...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Insights</h1>

        <Link
          href="/admin/insights/new"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + New Post
        </Link>
      </div>

      {/* EMPTY STATE */}
      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No posts created yet.
        </div>
      )}

      {/* POSTS LIST */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex justify-between items-center p-4 border-b last:border-b-0"
          >
            <div>
              <p className="font-semibold">{post.title}</p>

              <div className="flex gap-3 text-xs text-gray-500 mt-1">
                <span>{post.category}</span>
                {post.pinned && <span>📌 Pinned</span>}
                {post.featured && <span>⭐ Featured</span>}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/admin/insights/${post.slug}`}
                className="text-blue-600 text-sm"
              >
                Edit
              </Link>

              <button
                onClick={() => deletePost(post.slug)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
