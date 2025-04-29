"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditPostPage({ params }) {
  const { slug } = params;
  const router = useRouter();

  const [post, setPost] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    tags: "college",
    type: "blog",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch post");

        // Convert tags array to comma-separated string if needed
        setPost({ ...data.data, tags: data.data.tags});
        setLoading(false);
      } catch (error) {
        setMessage({ type: "error", text: error.message });
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...post,
          tags: post.tags,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update post");

      setMessage({ type: "success", text: "Post updated successfully!" });
      setTimeout(() => router.push("/admin/insights"), 1000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading post...</div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={post.slug}
          onChange={(e) => setPost({ ...post, slug: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Summary"
          value={post.summary}
          onChange={(e) => setPost({ ...post, summary: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content (HTML or Markdown)"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full border p-2 rounded h-40"
          required
        />
        <select
          value={post.tags}
          onChange={(e) => setPost({ ...post, tags: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="college">College</option>
          <option value="exam">Exam</option>
          <option value="scholarship">Scholarship</option>
        </select>
        <select
          value={post.type}
          onChange={(e) => setPost({ ...post, type: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="blog">Blog</option>
          <option value="news">News</option>
          <option value="update">Update</option>
        </select>
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={post.thumbnail}
          onChange={(e) => setPost({ ...post, thumbnail: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded text-white ${saving ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={saving}
        >
          {saving ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
