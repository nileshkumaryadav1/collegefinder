"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddExamPage() {
  const router = useRouter();
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
        slug: "",
        type: "",
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
    <div className="max-w-6/7 mx-auto p-6 bg-white shadow-md rounded-lg py-10 my-10">
      {/* Add Exam Form */}
      <form onSubmit={handleSubmit} className="grid gap-4 bg-gray-100 p-6 rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Add a New Exam</h1>
        {message && <p className="text-center text-gray-700 mb-4">{message}</p>}
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
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select Exam Type</option>
          <option value="engineering">Engineering</option>
          <option value="medical">Medical</option>
          <option value="management">Management</option>
        </select>
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
      <div className="mt-12 bg-gray-100 p-2 rounded">
        <h2 className="text-2xl font-bold my-6 text-center border-t">Manage Exams</h2>
        {exams.length === 0 ? (
          <p className="text-center text-gray-500">No exams found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col"
              >
                {exam.imageUrl && (
                  <img
                    src={exam.imageUrl}
                    alt={exam.name}
                    className="h-40 w-full object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {exam.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Type:</strong> {exam.type}
                  <strong>Slug:</strong> {exam.slug}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Date:</strong> {exam.date}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Eligibility:</strong> {exam.eligibility?.slice(0, 80)+"..."}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Syllabus:</strong> {exam.syllabus?.slice(0, 80)+"..."}
                </p>
                <a
                  href={exam.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 hover:underline"
                >
                  Visit Official Site
                </a>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => router.push(`/admin/exams/${exam._id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exam._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
