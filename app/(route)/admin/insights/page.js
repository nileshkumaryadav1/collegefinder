"use client";

import formatDate from "@/components/small/DateFormatter";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  /* =============================
     FETCH POSTS
  ============================== */
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        const json = await res.json();

        if (json?.success) {
          setPosts(json.data);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Failed to load posts", err);
        setPosts([]);
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
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      setDeleting(slug);
      await fetch(`/api/posts/${slug}`, { method: "DELETE" });

      // Optimistic update
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete post");
    } finally {
      setDeleting(null);
    }
  }

  /* =============================
     UI STATES
  ============================== */
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-10 text-gray-500">Loading posts…</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manage Blogs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, edit, or remove insight articles.
          </p>
        </div>

        <Link
          href="/admin/insights/new"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
        >
          + New Post
        </Link>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {posts.length === 0 && (
        <div className="text-center py-16 text-gray-500 border rounded-xl bg-gray-50">
          No posts created yet.
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {posts.length > 0 && (
        <div className="text-center text-gray-500">
          No. of posts: {posts.length}
        </div>
      )}

      {/* ================= POSTS LIST ================= */}
      {posts.length > 0 && (
        <div className="bg-white border rounded-xl overflow-hidden divide-y">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className="flex justify-between items-center p-4 hover:bg-gray-50 transition"
            >
              {/* LEFT */}
              <div className="space-y-1">
                <p className="font-semibold leading-tight">
                  {index + 1} - {post.title}
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span className="capitalize">
                    {post.category.replace("-", " ")}
                  </span>
                  {post.pinned && <span>📌 Pinned</span>}
                  {post.featured && <span>⭐ Featured</span>}
                  {formatDate(post.createdAt)}
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex gap-4 items-center text-sm">
                <Link
                  href={`/admin/insights/${post.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deletePost(post.slug)}
                  disabled={deleting === post.slug}
                  className="text-red-600 hover:underline disabled:opacity-50"
                >
                  {deleting === post.slug ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
