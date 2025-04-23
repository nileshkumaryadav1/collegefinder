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
    const res = await fetch(`/api/posts/${slug}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Post deleted");
      setPosts(posts.filter((post) => post.slug !== slug));
    } else {
      alert("Error deleting post");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="my-5">
        <h1 className="text-2xl font-bold mb-4">Insights</h1>

        <Link
          href="/admin/insights/new"
          className="bg-blue-600 text-white px-4 py-2 rounded my-4"
        >
          Create New Post
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Manage Posts</h1>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Tag</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.slug}>
              <td className="border px-4 py-2">{post.title}</td>
              <td className="border px-4 py-2">{post.type}</td>
              <td className="border px-4 py-2">{post.tags}</td>
              <td className="border px-4 py-2">
                <Link
                  href={`/admin/insights/${post.slug}`}
                  className="text-blue-600 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePost(post.slug)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
