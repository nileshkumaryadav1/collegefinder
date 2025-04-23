"use client";

import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function EditPostPage({ params }) {
  const { slug } = params;
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch post");

        setPost({
          ...data.data,
          tags: data.data.tags?.join(",") || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600 text-lg">
        Failed to load post: {error}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {post.seoMeta?.title || post.title || "Edit Post"} | College Finder
        </title>
        <meta
          name="description"
          content={
            post.seoMeta?.description ||
            post.summary ||
            "Edit your blog post on College Finder."
          }
        />
        <meta
          name="keywords"
          content={
            post.seoMeta?.keywords?.join(", ") || "college, blog, education"
          }
        />
        <meta property="og:title" content={post.seoMeta?.title || post.title} />
        <meta
          property="og:description"
          content={post.seoMeta?.description || post.summary}
        />
        <meta
          property="og:image"
          content={post.seoMeta?.image || post.thumbnail || "/default-og.png"}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href={`https://collegefinder.com/insights/${slug}`}
        />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-3">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500">
            Published on {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </header>

        <section className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-10">
          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-auto rounded-md mb-4 object-cover"
            />
          )}
          <p className="text-gray-700 text-lg leading-relaxed">
            {post.summary}
          </p>
        </section>
      </main>
    </>
  );
}
