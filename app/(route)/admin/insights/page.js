"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function InsightsAdmin() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  async function deletePost(slug) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setPosts(posts.filter((post) => post.slug !== slug));
    } else {
      alert("❌ Error deleting post");
    }
  }

  return (
    <div
      className="max-w-6xl mx-auto p-6 rounded-xl shadow-md"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: "var(--font-Orbitron)" }}
        >
          ⚡ Insights Manager
        </h1>

        <Link
          href="/admin/insights/new"
          className="px-5 py-2 rounded-lg shadow-md font-medium transition"
          style={{
            background: "var(--accent)",
            color: "#fff",
          }}
        >
          ➕ Create New Post
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm border border-[var(--border)]">
        <table className="min-w-full border-collapse">
          <thead
            style={{ background: "var(--highlight)", color: "var(--foreground)" }}
          >
            <tr>
              <th className="px-4 py-3 text-left font-semibold border border-[var(--border)]">
                Title
              </th>
              <th className="px-4 py-3 text-left font-semibold border border-[var(--border)]">
                Type
              </th>
              <th className="px-4 py-3 text-left font-semibold border border-[var(--border)]">
                Tags
              </th>
              <th className="px-4 py-3 text-center font-semibold border border-[var(--border)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <tr
                  key={post.slug}
                  className={index % 2 === 0 ? "bg-white" : "bg-[var(--background)]"}
                >
                  <td className="px-4 py-3 border border-[var(--border)]">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 border border-[var(--border)] text-sm text-[var(--secondary)]">
                    {post.type}
                  </td>
                  <td className="px-4 py-3 border border-[var(--border)] text-sm text-[var(--secondary)]">
                    {Array.isArray(post.tags) ? post.tags.join(", ") : post.tags}
                  </td>
                  <td className="px-4 py-3 border border-[var(--border)] text-center space-x-3">
                    <Link
                      href={`/admin/insights/${post.slug}`}
                      className="font-medium hover:underline"
                      style={{ color: "var(--highlight)" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(post.slug)}
                      className="font-medium hover:underline"
                      style={{ color: "red" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-[var(--secondary)]"
                >
                  No posts found. Start by creating one 🚀
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
