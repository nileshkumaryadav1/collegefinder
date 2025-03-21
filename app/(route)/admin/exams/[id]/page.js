"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditExamPage() {
  const router = useRouter();
  const { id } = useParams(); // Get exam ID from URL params
  const [formData, setFormData] = useState({
    name: "",
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
        const res = await fetch(`/api/exams/${id}`);
        if (!res.ok) throw new Error("Failed to fetch exam");
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
        setMessage("Error loading exam details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchExam();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`/api/exams/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update exam");
      setMessage("Exam updated successfully!");

      // Redirect to manage exams page after update
      setTimeout(() => {
        router.push("/admin/exams");
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("Error updating exam");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Exam</h1>
      {message && <p className="text-center text-gray-700 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="grid gap-4">
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
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="eligibility"
          placeholder="eligibility"
          value={formData.eligibility}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="syllabus"
          placeholder="syllabus"
          value={formData.syllabus}
          onChange={handleChange}
          className="border p-2 rounded w-full h-24"
          required
        />
        <input
          type="text"
          name="website"
          placeholder="website"
          value={formData.website}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Update Exam
        </button>
      </form>
    </div>
  );
}
