"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditExamPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "",
    date: "",
    eligibility: "",
    syllabus: "",
    website: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch exam data when page loads
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await fetch(`/api/exams/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch exam details");
        const { data } = await res.json(); // Expecting { success: true, data: {...} }
        setFormData(data);
      } catch (error) {
        console.error("Fetch Exam Error:", error);
        setMessage("Error loading exam details");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchExam();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`/api/exams/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update exam");

      setMessage("✅ Exam updated successfully!");
      setTimeout(() => {
        router.push("/admin/exams");
      }, 1500);
    } catch (error) {
      console.error("Update Exam Error:", error);
      setMessage("❌ Error updating exam. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading exam details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Exam</h1>

      {message && (
        <div
          className={`text-center mb-6 p-3 rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-5">
        <input
          type="text"
          name="name"
          placeholder="Exam Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        >
          <option value="">Select Type</option>
          <option value="engineering">Engineering</option>
          <option value="medical">Medical</option>
          <option value="management">Management</option>
        </select>
        <input
          type="text"
          name="date"
          placeholder="Exam Date (e.g. 10 June 2025)"
          value={formData.date}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <input
          type="text"
          name="eligibility"
          placeholder="Eligibility Criteria"
          value={formData.eligibility}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <input
          type="url"
          name="syllabus"
          placeholder="Syllabus PDF URL"
          value={formData.syllabus}
          onChange={handleChange}
          className="border p-3 rounded w-full h-28"
          required
        />
        <input
          type="url"
          name="website"
          placeholder="Official Website URL"
          value={formData.website}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all"
        >
          Update Exam
        </button>
      </form>
    </div>
  );
}
