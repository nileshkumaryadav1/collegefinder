"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SponsorAdminPage() {
  const [sponsors, setSponsors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    email: "",
    about: "",
    websiteUrl: "",
    imageUrl: "",
  });
  const [editingEmail, setEditingEmail] = useState(null);

  const fetchSponsors = async () => {
    const res = await fetch("/api/sponsors");
    const data = await res.json();
    setSponsors(data);
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingEmail ? "PUT" : "POST";
    const payload = editingEmail
      ? { email: editingEmail, update: formData }
      : formData;

    const res = await fetch("/api/sponsors", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fetchSponsors();
      setFormData({
        name: "",
        slug: "",
        email: "",
        about: "",
        websiteUrl: "",
        imageUrl: "",
      });
      setEditingEmail(null);
    }
  };

  const handleDelete = async (email) => {
    const confirmed = confirm("Are you sure you want to delete this sponsor?");
    if (!confirmed) return;

    const res = await fetch("/api/sponsors", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) fetchSponsors();
  };

  const handleEdit = (sponsor) => {
    setFormData({ ...sponsor });
    setEditingEmail(sponsor.email);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Sponsors</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            name="websiteUrl"
            placeholder="Website URL"
            value={formData.websiteUrl}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <textarea
          name="about"
          placeholder="About"
          value={formData.about}
          onChange={handleChange}
          required
          className="textarea textarea-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">
          {editingEmail ? "Update Sponsor" : "Add Sponsor"}
        </button>
        {editingEmail && (
          <button
            type="button"
            onClick={() => {
              setEditingEmail(null);
              setFormData({
                name: "",
                slug: "",
                email: "",
                about: "",
                websiteUrl: "",
                imageUrl: "",
              });
            }}
            className="btn btn-ghost ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      {/* List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Sponsors</h2>
        <div className="grid gap-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor._id}
              className="bg-white dark:bg-gray-900 p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={sponsor.imageUrl}
                  alt={sponsor.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{sponsor.name}</h3>
                  <p className="text-sm text-gray-500">{sponsor.email}</p>
                </div>
              </div>
              <div className="mt-2 md:mt-0 flex gap-2">
                <button
                  onClick={() => handleEdit(sponsor)}
                  className="btn btn-sm btn-outline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(sponsor.email)}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
