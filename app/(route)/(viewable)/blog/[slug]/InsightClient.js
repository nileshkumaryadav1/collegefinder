"use client";

import formatDate from "@/components/small/DateFormatter";
import { motion } from "framer-motion";
import { Calendar, User, Tag, Star } from "lucide-react";
import Image from "next/image";

/* =========================
   BLOCK RENDERER
========================= */
function RenderBlock({ block }) {
  switch (block.type) {
    case "heading": {
      const HeadingTag = `h${block.level || 2}`;
      return (
        <HeadingTag className="mt-10 mb-4 text-2xl font-semibold text-indigo-700">
          {block.text}
        </HeadingTag>
      );
    }

    case "paragraph":
      return (
        <p className="text-gray-700 leading-relaxed my-4 text-[15px]">
          {block.text}
        </p>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-indigo-600 pl-5 italic text-gray-600 my-6 bg-indigo-50/40 py-3 rounded-r">
          {block.text}
        </blockquote>
      );

    case "alert": {
      const alertColors = {
        info: "bg-blue-50 border-blue-500 text-blue-800",
        warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
        success: "bg-green-50 border-green-500 text-green-800",
        danger: "bg-red-50 border-red-500 text-red-800",
      };

      return (
        <div
          className={`border-l-4 p-4 my-6 rounded-lg text-sm ${alertColors[block.alertType]}`}
        >
          {block.text}
        </div>
      );
    }

    case "list":
      return (
        <ul className="list-disc list-inside my-5 space-y-2 text-gray-700">
          {block.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "image":
      return (
        <figure className="my-10">
          <Image
            src={block.image.url}
            alt={block.image.alt || ""}
            width={900}
            height={500}
            className="rounded-2xl w-full object-cover shadow-sm"
          />
          {block.image.caption && (
            <figcaption className="text-sm text-gray-500 text-center mt-3">
              {block.image.caption}
            </figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <div className="overflow-x-auto my-8">
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-gray-100">
              <tr>
                {block.table.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border px-4 py-3 text-left font-semibold text-gray-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, i) => (
                <tr key={i} className="even:bg-gray-50">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border px-4 py-3 text-gray-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {block.table.source && (
            <p className="text-xs text-gray-400 mt-3">
              Source: {block.table.source}
            </p>
          )}
        </div>
      );

    default:
      return null;
  }
}

/* =========================
   MAIN PAGE
========================= */
export default function InsightClient({ post }) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* ================= HEADER ================= */}
      <motion.header
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {post.title}
        </h1>

        <div className="flex flex-wrap justify-center gap-5 mt-5 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {formatDate(post.createdAt)}
          </span>

          {post.author && (
            <span className="flex items-center gap-1">
              <User size={16} /> Author
            </span>
          )}

          {post.tags?.length > 0 && (
            <span className="flex items-center gap-1">
              <Tag size={16} /> {post.tags.join(", ")}
            </span>
          )}

          <span className="flex items-center gap-1">
            <Star
              size={16}
              className={post.featured ? "text-yellow-500" : "text-gray-400"}
            />
            {post.featured ? "Featured" : "Standard"}
          </span>
        </div>
      </motion.header>

      {/* ================= HERO ================= */}
      {post.hero?.image && (
        <section className="mb-12">
          <Image
            src={post.hero.image}
            alt={post.hero.imageAlt || post.title}
            width={1000}
            height={500}
            className="rounded-3xl w-full object-cover shadow-md"
          />
          {post.hero.subtitle && (
            <p className="text-center text-gray-500 mt-4 text-sm">
              {post.hero.subtitle}
            </p>
          )}
        </section>
      )}

      {/* ================= SUMMARY ================= */}
      {post.summary && (
        <section className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-2xl mb-12">
          {post.summary.lead && (
            <p className="font-semibold text-gray-800 mb-4 text-lg">
              {post.summary.lead}
            </p>
          )}

          {post.summary.paragraphs?.map((p, i) => (
            <p key={i} className="text-gray-700 mb-3">
              {p}
            </p>
          ))}

          {post.summary.highlights?.length > 0 && (
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
              {post.summary.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* ================= CONTENT ================= */}
      <section>
        {post.contentBlocks?.map((block, i) => (
          <RenderBlock key={i} block={block} />
        ))}
      </section>

      {/* ================= FOOTER ================= */}
      {post.updatedAt && (
        <p className="mt-14 text-xs text-gray-400 text-center">
          Last updated on {formatDate(post.updatedAt)}
        </p>
      )}
    </main>
  );
}
