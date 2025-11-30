"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        setMessage("❌ Failed to load exams");
      }
    };

    fetchExams();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      setFormData((prev) => ({
        ...prev,
        name: value,
        slug:
          prev.slug === "" ||
          prev.slug === prev.name.toLowerCase().replace(/\s+/g, "-")
            ? generatedSlug
            : prev.slug,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.name || !formData.slug || !formData.type || !formData.date) {
      setMessage("❌ Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add exam");
      setMessage("✅ Exam added successfully!");

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

      const newExams = await fetch("/api/exams").then((res) => res.json());
      setExams(newExams);
    } catch (error) {
      console.error(error);
      setMessage(`❌ Error adding exam: ${error.message}`);
    }

    setLoading(false);
  };

  const handleDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    try {
      const res = await fetch(`/api/exams/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete exam");

      setExams((prev) => prev.filter((exam) => exam.slug !== slug));
      setMessage("✅ Exam deleted successfully!");
    } catch (error) {
      console.error(error);
      setMessage(`❌ Error deleting exam: ${error.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[var(--background)] text-[var(--foreground)] shadow-md rounded-lg py-10 my-10">
      {/* Add Exam Form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 bg-[var(--background)] text-[var(--foreground)] p-6 rounded"
      >
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
          placeholder="Slug (auto-generated if blank)"
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
          placeholder="Exam Date (e.g., May 5, 2025 or May 5 - 10, 2025)"
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

        <input
          type="url"
          name="syllabus"
          placeholder="Syllabus PDF Link"
          value={formData.syllabus}
          onChange={handleChange}
          className="border p-2 rounded w-full"
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
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Exam"}
          </button>

          <button
            type="button"
            onClick={() =>
              setFormData({
                name: "",
                slug: "",
                type: "",
                date: "",
                eligibility: "",
                syllabus: "",
                website: "",
                imageUrl: "",
              })
            }
            className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-lg w-full"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Manage Exams Section */}
      <div className="mt-12 bg-[var(--background)] text-[var(--foreground)] p-2 rounded">
        <h2 className="text-2xl font-bold my-6 text-center border-t pt-6">
          Manage Exams
        </h2>

        {exams.length === 0 ? (
          <p className="text-center text-gray-500">No exams found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.slug || exam._id}
                className="bg-[var(--background)] text-[var(--foreground)] border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col"
              >
                {exam.imageUrl && (
                  <Image
                    src={exam.imageUrl}
                    alt={exam.name}
                    width={400}
                    height={300}
                    className="h-40 w-full object-cover rounded mb-4"
                  />
                )}

                <h3 className="text-lg font-semibold text-[var(--highlight)] mb-1">
                  {exam.name}
                </h3>

                <p className="text-sm text-gray-500 mb-1">
                  <strong>Type:</strong> {exam.type}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Slug:</strong> {exam.slug}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Date:</strong> {exam.date}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Eligibility:</strong>{" "}
                  {exam.eligibility
                    ? exam.eligibility.slice(0, 80) + "..."
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Syllabus:</strong>{" "}
                  {exam.syllabus ? exam.syllabus.slice(0, 30) + "..." : "N/A"}
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
                    onClick={() => router.push(`/admin/exams/${exam.slug}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded w-1/2 cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(exam.slug)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded w-1/2 cursor-pointer"
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
