"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddExamPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    eligibility: "",
    syllabus: "",
    website: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [exams, setExams] = useState([]);

  // Fetch all exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/exams");
        if (!res.ok) throw new Error("Failed to fetch exams");
        const data = await res.json();
        setExams(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExams();
  }, []);

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

      if (!res.ok) throw new Error("Failed to add exam");
      setMessage("Exam added successfully!");

      // Reset form
      setFormData({
        name: "",
        date: "",
        eligibility: "",
        syllabus: "",
        website: "",
        imageUrl: "",
      });

      // Refresh exams list
      const newExams = await fetch("/api/exams").then((res) => res.json());
      setExams(newExams);
    } catch (error) {
      console.error(error);
      setMessage("Error adding exam");
    }

    setLoading(false);
  };

  // Delete exam
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    try {
      const res = await fetch(`/api/exams/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete exam");

      // Refresh exams list
      setExams((prev) => prev.filter((exam) => exam._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6/7 mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      <h1 className="text-2xl font-bold mb-4">Add a New Exam</h1>
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
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Exam"}
        </button>
      </form>

      {/* Manage Exams Section */}
      <div className="mt-10 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Manage Exams</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Eligibility</th>
                <th className="border p-2">Syllabus</th>
                <th className="border p-2">Website</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    No exams found.
                  </td>
                </tr>
              ) : (
                exams.map((exam) => (
                  <tr key={exam._id} className="border-b">
                    <td className="border p-2">{exam.name}</td>
                    <td className="border p-2">{exam.date}</td>
                    <td className="border p-2">{exam.eligibility}</td>
                    <td className="border p-2">{exam.syllabus}</td>
                    <td className="border p-2">{exam.website}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => router.push(`/admin/exams/${exam._id}`)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exam._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
