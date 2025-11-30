"use client";
import { useState, useEffect } from "react";
import { Trash, Pencil } from "lucide-react";

export default function ManageScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    level: "graduate",
    about: "",
    amount: "",
    eligibility: "",
    deadline: "",
    officialLink: "",
  });

  const [editSlug, setEditSlug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchScholarships();
  }, []);

  async function fetchScholarships() {
    try {
      const res = await fetch("/api/scholarships");
      if (!res.ok) throw new Error("Failed to fetch scholarships");
      const data = await res.json();
      setScholarships(data.data); // Fix: Use `data.data`
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Validate fields
    if (Object.values(formData).some((field) => !field)) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/scholarships", {
        method: editSlug ? "PUT" : "POST", // Use PUT if editing
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editSlug ? { slug: editSlug, ...formData } : formData
        ), // Pass slug for editing
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      await fetchScholarships();
      resetForm();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug) {
    if (!confirm("Are you sure you want to delete this scholarship?")) return;

    try {
      const res = await fetch(`/api/scholarships/${slug}`, {
        // Send the slug in the URL for deletion
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Error deleting scholarship");

      fetchScholarships();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleEdit(item) {
    setFormData({
      name: item.name,
      slug: item.slug,
      level: item.level,
      about: item.about,
      amount: item.amount,
      eligibility: item.eligibility,
      deadline: item.deadline,
      officialLink: item.officialLink,
    });
    setEditSlug(item.slug); // Set slug for editing
  }

  function resetForm() {
    setFormData({
      name: "",
      slug: "",
      level: "graduate",
      about: "",
      amount: "",
      eligibility: "",
      deadline: "",
      officialLink: "",
    });
    setEditSlug(null);
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Manage Scholarships
      </h1>

      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto"
      >
        <input
          type="text"
          name="name"
          placeholder="Scholarship Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 bg-[var(--background)] text-[var(--foreground)] rounded w-full mb-2"
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="p-2 bg-[var(--background)] text-[var(--foreground)] rounded w-full mb-2"
          required
        />
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="p-2 bg-[var(--background)] text-[var(--foreground)] rounded w-full mb-2"
        >
          <option value="graduate">Graduate</option>
          <option value="postgraduate">Post graduate</option>
        </select>
        <input
          type="text"
          name="about"
          placeholder="About"
          value={formData.about}
          onChange={handleChange}
          className="p-2 bg-[var(--background)] text-[var(--foreground)] rounded w-full mb-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Scholarship Amount"
          value={formData.amount}
          onChange={handleChange}
          className="p-2 bg-[var(--background)] text-[var(--foreground)] rounded w-full mb-2"
        />
        <input
          type="text"
          name="eligibility"
          placeholder="Eligibility Criteria"
          value={formData.eligibility}
          onChange={handleChange}
          className="p-2 bg-[var(--background)] text-[var(--foreground)] rounded w-full mb-2"
        />
        <input
          type="text"
          name="deadline"
          placeholder="Deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="p-2 bg-[var(--background)] text-[var(--foreground)] rounded w-full mb-2"
          required
        />
        <input
          type="text"
          name="officialLink"
          placeholder="Official Website"
          value={formData.officialLink}
          onChange={handleChange}
          className="p-2 bg-[var(--background)] text-[var(--foreground)] rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded hover:bg-blue-600 w-full disabled:bg-gray-500"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : editSlug
              ? "Update Scholarship"
              : "Add Scholarship"}
        </button>
      </form>

      <div className="mt-6 max-w-4xl mx-auto">
        {scholarships.length === 0 ? (
          <p className="text-center text-gray-400">
            No scholarships available.
          </p>
        ) : (
          scholarships.map((scholarship) => (
            <div
              key={scholarship.slug}
              className="flex justify-between bg-gray-800 p-4 rounded shadow mb-3"
            >
              <div>
                <h3 className="text-lg font-bold">
                  {scholarship.name} - ₹{scholarship.amount}
                </h3>
                <p className="text-gray-400">
                  {scholarship.slug} | {scholarship.about}
                </p>
                <p className="text-gray-400">Level: {scholarship.level}</p>
                <p className="text-green-400">
                  Eligibility: {scholarship.eligibility}
                </p>
                <p className="text-yellow-400">
                  Deadline: {scholarship.deadline}
                </p>
                <a
                  href={scholarship.officialLink}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official Link
                </a>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(scholarship)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(scholarship.slug)}
                  className="text-red-400 hover:text-red-300"
                >
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
