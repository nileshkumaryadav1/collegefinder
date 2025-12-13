"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPostPage({ params }) {
  const router = useRouter();
  const { slug } = params;

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  /* =============================
     FETCH EXISTING POST
  ============================== */
  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        const data = await res.json();

        if (!data || data.message) {
          setForm(null);
        } else {
          setForm(data.data);
        }
      } catch (err) {
        console.error("Failed to load post", err);
        setForm(null);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return <p className="p-10 text-gray-500">Loading article…</p>;
  }

  if (!form) {
    return <p className="p-10 text-red-500">Post not found.</p>;
  }

  /* =============================
     CONTENT BLOCK HELPERS
  ============================== */
  const updateBlock = (index, key, value) => {
    const blocks = [...(form.contentBlocks || [])];
    blocks[index] = { ...blocks[index], [key]: value };
    setForm({ ...form, contentBlocks: blocks });
  };

  const addBlock = (type) => {
    let block = { type };

    if (type === "paragraph") block.text = "";
    if (type === "heading") {
      block.text = "";
      block.level = 2;
    }
    if (type === "list") block.items = [""];
    if (type === "alert") {
      block.text = "";
      block.alertType = "info";
    }

    setForm({
      ...form,
      contentBlocks: [...(form.contentBlocks || []), block],
    });
  };

  const removeBlock = (index) => {
    const blocks = [...form.contentBlocks];
    blocks.splice(index, 1);
    setForm({ ...form, contentBlocks: blocks });
  };

  /* =============================
     UPDATE HANDLER
  ============================== */
  async function handleUpdate(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      router.push("/admin/insights");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update article");
    } finally {
      setSaving(false);
    }
  }

  console.log(form);

  /* =============================
     UI
  ============================== */
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <header>
        <h1 className="text-3xl font-bold">Edit Insight Article</h1>
        <p className="text-gray-500 mt-1">
          Update editorial content, blocks, and SEO details.
        </p>
      </header>

      <form onSubmit={handleUpdate} className="space-y-12">

        {/* ================= BASIC INFO ================= */}
        <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>

          <input
            className="input"
            placeholder="Article Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            className="input bg-gray-100 cursor-not-allowed"
            value={form.slug}
            disabled
          />

          <select
            className="input"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
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
            className="input"
            placeholder="Exam Type (JEE / NEET / GATE)"
            value={form.examType || ""}
            onChange={(e) =>
              setForm({ ...form, examType: e.target.value })
            }
          />
        </section>

        {/* ================= HERO ================= */}
        <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Hero Section</h2>

          <input
            className="input"
            placeholder="Hero Title"
            value={form.hero?.title || ""}
            onChange={(e) =>
              setForm({
                ...form,
                hero: { ...form.hero, title: e.target.value },
              })
            }
          />

          <input
            className="input"
            placeholder="Hero Subtitle"
            value={form.hero?.subtitle || ""}
            onChange={(e) =>
              setForm({
                ...form,
                hero: { ...form.hero, subtitle: e.target.value },
              })
            }
          />

          <input
            className="input"
            placeholder="Hero Image URL"
            value={form.hero?.image || ""}
            onChange={(e) =>
              setForm({
                ...form,
                hero: { ...form.hero, image: e.target.value },
              })
            }
          />
        </section>

        {/* ================= SUMMARY ================= */}
        <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Editorial Summary</h2>

          <textarea
            className="input"
            rows={3}
            placeholder="Lead line (bold opening)"
            value={form.summary?.lead || ""}
            onChange={(e) =>
              setForm({
                ...form,
                summary: {
                  ...form.summary,
                  lead: e.target.value,
                },
              })
            }
          />

          <textarea
            className="input"
            rows={4}
            placeholder="Main summary paragraph"
            value={form.summary?.paragraphs?.[0] || ""}
            onChange={(e) =>
              setForm({
                ...form,
                summary: {
                  ...form.summary,
                  paragraphs: [e.target.value],
                },
              })
            }
          />

          <input
            className="input"
            placeholder="Highlight point"
            value={form.summary?.highlights?.[0] || ""}
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
        <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Content Blocks</h2>

          <div className="flex flex-wrap gap-2">
            {["paragraph", "heading", "list", "alert"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => addBlock(type)}
                className="px-3 py-1 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
              >
                + {type}
              </button>
            ))}
          </div>

          {form.contentBlocks?.map((block, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase text-gray-500">
                  {block.type}
                </span>

                <button
                  type="button"
                  onClick={() => removeBlock(i)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>

              {block.text !== undefined && (
                <textarea
                  className="input"
                  rows={3}
                  value={block.text}
                  onChange={(e) =>
                    updateBlock(i, "text", e.target.value)
                  }
                />
              )}
            </div>
          ))}
        </section>

        {/* ================= SEO ================= */}
        <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">SEO Metadata</h2>

          <input
            className="input"
            placeholder="SEO Title"
            value={form.seoMeta?.title || ""}
            onChange={(e) =>
              setForm({
                ...form,
                seoMeta: {
                  ...form.seoMeta,
                  title: e.target.value,
                },
              })
            }
          />

          <textarea
            className="input"
            rows={3}
            placeholder="SEO Description"
            value={form.seoMeta?.description || ""}
            onChange={(e) =>
              setForm({
                ...form,
                seoMeta: {
                  ...form.seoMeta,
                  description: e.target.value,
                },
              })
            }
          />
        </section>

        {/* ================= ACTION ================= */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-60"
        >
          {saving ? "Updating…" : "Update Article"}
        </button>
      </form>
    </div>
  );
}
