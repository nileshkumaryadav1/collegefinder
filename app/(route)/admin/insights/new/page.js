"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");
}

export default function CreatePostPage() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    tags: "college", // comma-separated, converted in payload
    type: "blog",
    thumbnail: "",
    featured: false,
    pinned: false,
    seoMeta: {
      title: "",
      description: "",
      keywords: "",
      canonicalUrl: "",
      metaRobots: "index, follow",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [seoOpen, setSeoOpen] = useState(false);

  // Auto-generate slug
  useEffect(() => {
    if (post.title && !post.slug) {
      setPost((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [post.title]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...post,
        tags: post.tags
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean),
        seoMeta: {
          ...post.seoMeta,
          keywords: post.seoMeta.keywords
            ? post.seoMeta.keywords
                .split(",")
                .map((k) => k.trim().toLowerCase())
            : [],
        },
      };

      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage("✅ Post created successfully!");
        setTimeout(() => router.push("/admin/insights"), 1200);
      } else {
        setMessage(`❌ Error: ${result.error || "Failed to create post"}`);
      }
    } catch (err) {
      setLoading(false);
      setMessage("❌ Network error. Try again.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        ✍️ Create New Post
      </h1>

      {message && (
        <p
          className={`mb-4 text-center text-sm font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Slug */}
        <input
          type="text"
          placeholder="Slug (auto-generated, editable)"
          value={post.slug}
          onChange={(e) => setPost({ ...post, slug: slugify(e.target.value) })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Summary */}
        <textarea
          placeholder="Summary"
          value={post.summary}
          onChange={(e) => setPost({ ...post, summary: e.target.value })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={2}
          required
        />

        {/* Content */}
        <textarea
          placeholder="Content (HTML, Markdown, or JSON)"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 h-40"
          required
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma separated: college, exam, scholarship)"
          value={post.tags}
          onChange={(e) => setPost({ ...post, tags: e.target.value })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Type */}
        <select
          value={post.type}
          onChange={(e) => setPost({ ...post, type: e.target.value })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="blog">Blog</option>
          <option value="news">News</option>
          <option value="exams">Exams</option>
          <option value="update">Update</option>
        </select>

        {/* Featured / Pinned */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={post.featured}
              onChange={(e) =>
                setPost({ ...post, featured: e.target.checked })
              }
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={post.pinned}
              onChange={(e) => setPost({ ...post, pinned: e.target.checked })}
            />
            Pinned
          </label>
        </div>

        {/* Thumbnail */}
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={post.thumbnail}
          onChange={(e) => setPost({ ...post, thumbnail: e.target.value })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt="Thumbnail Preview"
            className="mt-2 rounded-lg border max-h-40 object-cover"
          />
        )}

        {/* SEO Meta (collapsible) */}
        <button
          type="button"
          onClick={() => setSeoOpen(!seoOpen)}
          className="text-blue-600 text-sm font-medium underline"
        >
          {seoOpen ? "▼ Hide SEO Settings" : "▶ Show SEO Settings"}
        </button>

        {seoOpen && (
          <div className="space-y-3 border p-4 rounded-lg bg-gray-50">
            <input
              type="text"
              placeholder="SEO Title"
              value={post.seoMeta.title}
              onChange={(e) =>
                setPost({
                  ...post,
                  seoMeta: { ...post.seoMeta, title: e.target.value },
                })
              }
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="SEO Description"
              value={post.seoMeta.description}
              onChange={(e) =>
                setPost({
                  ...post,
                  seoMeta: { ...post.seoMeta, description: e.target.value },
                })
              }
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
            <input
              type="text"
              placeholder="SEO Keywords (comma separated)"
              value={post.seoMeta.keywords}
              onChange={(e) =>
                setPost({
                  ...post,
                  seoMeta: { ...post.seoMeta, keywords: e.target.value },
                })
              }
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Canonical URL"
              value={post.seoMeta.canonicalUrl}
              onChange={(e) =>
                setPost({
                  ...post,
                  seoMeta: { ...post.seoMeta, canonicalUrl: e.target.value },
                })
              }
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={post.seoMeta.metaRobots}
              onChange={(e) =>
                setPost({
                  ...post,
                  seoMeta: { ...post.seoMeta, metaRobots: e.target.value },
                })
              }
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="index, follow">index, follow</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </select>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition"
        >
          {loading ? "⏳ Creating..." : "🚀 Create Post"}
        </button>
      </form>
    </div>
  );
}
