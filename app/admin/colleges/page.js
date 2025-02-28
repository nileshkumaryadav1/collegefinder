"use client";

import { useState } from "react";

export default function AddCollegePage() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    ranking: "",
    image: "",
    description: "",
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
      const res = await fetch("/api/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setFormData({
          name: "",
          location: "",
          ranking: "",
          image: "",
          description: "",
          website: "",
        });
      }
    } catch (error) {
      setMessage("Error adding college");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Add a New College</h1>
      {message && <p className="text-center text-gray-700 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="College Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          name="ranking"
          placeholder="Ranking"
          value={formData.ranking}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full h-24"
          required
        />
        <input
          type="url"
          name="website"
          placeholder="Website URL"
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
          {loading ? "Adding..." : "Add College"}
        </button>
      </form>
    </div>
  );
}
