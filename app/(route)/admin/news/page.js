"use client";

import { useEffect, useState } from "react";
import { Trash, Pencil } from "lucide-react";

export default function ManageNews() {
  const [newsList, setNewsList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    publishedDate: "",
    sourceURL: "",
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNewsList(data.data);
    } catch (error) {
      setErrorMessage("Failed to load news");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (Object.values(formData).some((val) => !val)) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/news", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { id: editId, ...formData } : formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      await fetchNews();
      resetForm();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    try {
      const res = await fetch("/api/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete news");

      fetchNews();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleEdit(news) {
    setFormData({
      title: news.title,
      description: news.description,
      category: news.category,
      publishedDate: news.publishedDate,
      sourceURL: news.sourceURL,
    });
    setEditId(news._id);
  }

  function resetForm() {
    setFormData({
      title: "",
      description: "",
      category: "",
      publishedDate: "",
      sourceURL: "",
    });
    setEditId(null);
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-100 dark:text-white text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manage News</h1>

      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <input
          type="text"
          name="title"
          placeholder="News Title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 dark:bg-gray-700 bg-gray-100 dark:text-white text-gray-900 rounded w-full mb-2"
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 dark:bg-gray-700 bg-gray-100 dark:text-white text-gray-900 rounded w-full mb-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., College, Exam)"
          value={formData.category}
          onChange={handleChange}
          className="p-2 dark:bg-gray-700 bg-gray-100 dark:text-white text-gray-900 rounded w-full mb-2"
        />
        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          className="p-2 dark:bg-gray-700 bg-gray-100 dark:text-white text-gray-900 rounded w-full mb-2"
        />
        <input
          type="text"
          name="sourceURL"
          placeholder="Source URL"
          value={formData.sourceURL}
          onChange={handleChange}
          className="p-2 dark:bg-gray-700 bg-gray-100 dark:text-white text-gray-900 rounded w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-500 p-2 rounded hover:bg-blue-600 w-full disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? "Processing..." : editId ? "Update News" : "Add News"}
        </button>
      </form>

      <div className="mt-6 max-w-4xl mx-auto">
        {newsList.length === 0 ? (
          <p className="text-center text-gray-400">No news available.</p>
        ) : (
          newsList.map((news) => (
            <div key={news._id} className="flex justify-between bg-gray-800 p-4 rounded shadow mb-3">
              <div>
                <h3 className="text-lg dark:text-black text-white font-bold">{news.title}</h3>
                <p className="text-gray-400 mb-1">{news.description}</p>
                <p className="text-green-400">Category: {news.category}</p>
                <p className="text-yellow-400">Published: {news.publishedDate}</p>
                <a
                  href={news.sourceURL}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </a>
              </div>
              <div className="flex space-x-3">
                <button onClick={() => handleEdit(news)} className="text-yellow-400 hover:text-yellow-300">
                  <Pencil size={20} />
                </button>
                <button onClick={() => handleDelete(news._id)} className="text-red-400 hover:text-red-300">
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
