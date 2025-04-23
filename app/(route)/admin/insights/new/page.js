"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    tags: '',
    type: 'blog',
    thumbnail: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ ...post, tags: post.tags.split(",") }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    if (res.ok) {
      setMessage("✅ Post created successfully!");
      router.push("/admin/insights");
    } else {
      setMessage("❌ Error creating post.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      {message && <p className="mb-4 text-center text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={e => setPost({ ...post, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Slug (URL-friendly)"
          value={post.slug}
          onChange={e => setPost({ ...post, slug: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Summary"
          value={post.summary}
          onChange={e => setPost({ ...post, summary: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content (HTML or Markdown)"
          value={post.content}
          onChange={e => setPost({ ...post, content: e.target.value })}
          className="w-full border p-2 rounded h-40"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={post.tags}
          onChange={e => setPost({ ...post, tags: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <select
          value={post.type}
          onChange={e => setPost({ ...post, type: e.target.value })}
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
          onChange={e => setPost({ ...post, thumbnail: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
