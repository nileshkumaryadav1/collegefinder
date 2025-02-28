"use client";

import { useState } from "react";

export default function AddExamPage() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    eligibility: "",
    syllabus: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setFormData({
          name: "",
          date: "",
          eligibility: "",
          syllabus: "",
          website: "",
        });
      }
    } catch (error) {
      setMessage("Error adding exam");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Add a New Exam</h1>
      {message && <p className="text-center text-gray-700 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Exam Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="date"
          placeholder="Exam Date (or range)"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="eligibility"
          placeholder="Eligibility Criteria"
          value={formData.eligibility}
          onChange={handleChange}
          className="border p-2 rounded w-full h-24"
          required
        />
        <textarea
          name="syllabus"
          placeholder="Syllabus Details"
          value={formData.syllabus}
          onChange={handleChange}
          className="border p-2 rounded w-full h-24"
          required
        />
        <input
          type="url"
          name="website"
          placeholder="Official Website"
          value={formData.website}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Exam"}
        </button>
      </form>
    </div>
  );
}
