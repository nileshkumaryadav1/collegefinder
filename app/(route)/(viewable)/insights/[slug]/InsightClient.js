"use client";

import { motion } from "framer-motion";
import { Calendar, User, Tag, Star } from "lucide-react";
import Image from "next/image";

export default function InsightClient({ post }) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.header
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight mb-3">
          {post.title}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={16} />{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          {post.author && (
            <span className="flex items-center gap-1">
              <User size={16} /> {post.author}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Tag size={16} /> {post.tags}
          </span>
          <span className="flex items-center gap-1">
            <Star
              size={16}
              className={post.featured ? "text-yellow-500" : "text-gray-400"}
            />
            {post.featured ? "Featured" : "Standard"}
          </span>
        </div>
      </motion.header>

      {/* Thumbnail & Summary */}
      <motion.section
        className="bg-white shadow-md rounded-2xl border border-gray-200 p-6 mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {post.thumbnail && (
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={800}
            height={500}
            className="w-full h-auto rounded-xl mb-4 object-cover shadow-sm"
          />
        )}
        {post.summary && (
          <p className="text-gray-700 text-lg leading-relaxed">
            {post.summary}
          </p>
        )}
      </motion.section>

      {/* Content */}
      <motion.section
        className="bg-white shadow-md rounded-2xl border border-gray-200 p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Content</h2>
        <div
          className="prose max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.section>

      {/* Last Updated */}
      {post.updatedAt && (
        <p className="mt-6 text-xs text-gray-400 text-center">
          Last updated on {new Date(post.updatedAt).toLocaleDateString()}
        </p>
      )}
    </main>
  );
}
