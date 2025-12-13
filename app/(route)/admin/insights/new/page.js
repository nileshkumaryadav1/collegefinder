"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "general-update",
    examType: "",

    hero: {
      title: "",
      subtitle: "",
      image: "",
      imageAlt: "",
    },

    summary: {
      lead: "",
      paragraphs: [""],
      highlights: [""],
    },

    contentBlocks: [],

    seoMeta: {
      title: "",
      description: "",
      keywords: [],
    },
  });

  /* ========================
     HELPERS
  ======================== */

  const addBlock = (type) => {
    const block = { type };

    if (type === "paragraph") block.text = "";
    if (type === "heading") block.text = "", block.level = 2;
    if (type === "list") block.items = [""];
    if (type === "alert") block.text = "", block.alertType = "info";

    setForm({
      ...form,
      contentBlocks: [...form.contentBlocks, block],
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin/insights");
  }

  /* ========================
     UI
  ======================== */

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10">
      <h1 className="text-3xl font-bold">Create Insight Article</h1>

      {/* ================= BASIC INFO ================= */}
      <section className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="font-semibold text-xl">Basic Information</h2>

        <input
          placeholder="Title"
          className="input"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Slug (jee-main-cutoff-2025)"
          className="input"
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <select
          className="input"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="general-update">General Update</option>
          <option value="exam-news">Exam News</option>
          <option value="cutoff">Cutoff</option>
          <option value="result">Result</option>
          <option value="ranking">Ranking</option>
          <option value="comparison">Comparison</option>
          <option value="college-news">College News</option>
        </select>

        <input
          placeholder="Exam Type (JEE / GATE / NEET)"
          className="input"
          onChange={(e) => setForm({ ...form, examType: e.target.value })}
        />
      </section>

      {/* ================= HERO ================= */}
      <section className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="font-semibold text-xl">Hero Section</h2>

        <input
          placeholder="Hero Title"
          className="input"
          onChange={(e) =>
            setForm({
              ...form,
              hero: { ...form.hero, title: e.target.value },
            })
          }
        />

        <input
          placeholder="Hero Subtitle"
          className="input"
          onChange={(e) =>
            setForm({
              ...form,
              hero: { ...form.hero, subtitle: e.target.value },
            })
          }
        />

        <input
          placeholder="Hero Image URL"
          className="input"
          onChange={(e) =>
            setForm({
              ...form,
              hero: { ...form.hero, image: e.target.value },
            })
          }
        />
      </section>

      {/* ================= SUMMARY ================= */}
      <section className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="font-semibold text-xl">Editorial Summary</h2>

        <textarea
          placeholder="Lead (bold opening line)"
          className="input"
          onChange={(e) =>
            setForm({
              ...form,
              summary: { ...form.summary, lead: e.target.value },
            })
          }
        />

        <textarea
          placeholder="Summary paragraph"
          className="input"
          onChange={(e) =>
            setForm({
              ...form,
              summary: { ...form.summary, paragraphs: [e.target.value] },
            })
          }
        />

        <input
          placeholder="Highlight point"
          className="input"
          onChange={(e) =>
            setForm({
              ...form,
              summary: {
                ...form.summary,
                highlights: [e.target.value],
              },
            })
          }
        />
      </section>

      {/* ================= CONTENT BLOCKS ================= */}
      <section className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="font-semibold text-xl">Content Blocks</h2>

        <div className="flex flex-wrap gap-2">
          {["paragraph", "heading", "list", "alert"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              className="px-3 py-1 bg-gray-100 rounded text-sm"
            >
              + {type}
            </button>
          ))}
        </div>

        {form.contentBlocks.map((block, i) => (
          <div key={i} className="border rounded p-3 space-y-2">
            <p className="text-xs text-gray-500 uppercase">{block.type}</p>

            {block.text !== undefined && (
              <textarea
                className="input"
                placeholder="Text"
                onChange={(e) => {
                  const blocks = [...form.contentBlocks];
                  blocks[i].text = e.target.value;
                  setForm({ ...form, contentBlocks: blocks });
                }}
              />
            )}
          </div>
        ))}
      </section>

      {/* ================= SEO ================= */}
      <section className="bg-white p-6 rounded-xl shadow border space-y-4">
        <h2 className="font-semibold text-xl">SEO Metadata</h2>

        <input
          placeholder="SEO Title"
          className="input"
          onChange={(e) =>
            setForm({
              ...form,
              seoMeta: { ...form.seoMeta, title: e.target.value },
            })
          }
        />

        <textarea
          placeholder="SEO Description"
          className="input"
          onChange={(e) =>
            setForm({
              ...form,
              seoMeta: { ...form.seoMeta, description: e.target.value },
            })
          }
        />
      </section>

      <button type="submit" onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
        Publish Article
      </button>
    </div>
  );
}
