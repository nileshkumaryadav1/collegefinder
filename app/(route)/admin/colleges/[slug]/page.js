"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCollegePage() {
  const { slug } = useParams();
  const router = useRouter();

  const defaultData = {
    name: "",
    slug: "",
    location: "",
    phone: "",
    email: "",
    nirfRanking: "",
    imageUrl: "",
    logoUrl: "",
    description: "",
    courses: "",
    affiliation: "",
    type: "",
    admissionProcess: "",
    fees: {
      tuition: "",
      hostel: "",
      misc: "",
      waiver: "",
    },
    cutOff: "",
    facilities: "",
    noOfStudents: "",
    noOfFaculties: "",
    placement: {
      highest: "",
      average: "",
      median: "",
      ratio: "",
      recruiters: "",
    },
    websiteUrl: "",
    nirfPdf: "",
    virtualTourLink: "",
  };

  const [formData, setFormData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // --------------------------------------------
  // ⭐ SAFE MERGE FUNCTION (handles missing fields)
  // --------------------------------------------
  const mergeDeep = (target, source) => {
    for (let key in source) {
      if (
        typeof source[key] === "object" &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        target[key] = mergeDeep(
          target[key] || {},
          source[key]
        );
      } else {
        target[key] = source[key];
      }
    }
    return target;
  };

  // --------------------------------------------
  // ⭐ Fetch existing data safely
  // --------------------------------------------
  useEffect(() => {
    if (!slug) return;
    const fetchCollege = async () => {
      try {
        const res = await fetch(`/api/colleges/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch college");

        const result = await res.json();
        const existing = result.data || {};

        // ⚡ SAFE MERGE WITH DEFAULT FIELDS
        const merged = mergeDeep(JSON.parse(JSON.stringify(defaultData)), existing);

        setFormData(merged);
      } catch (err) {
        console.error(err);
        setError("Failed to load college details.");
      }
    };
    fetchCollege();
  }, [slug]);

  // --------------------------------------------
  // ⭐ Handle Normal + Nested Keys (fees.tuition)
  // --------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --------------------------------------------
  // ⭐ Submit (PUT request to update)
  // --------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`/api/colleges/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Update failed");
        alert(errData.message || "Update failed");
      }

      setMessage("✅ College updated successfully!");
      router.push("/admin/colleges");
    } catch (err) {
      console.error(err);
      setError(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------
  // ⭐ UI FORM
  // --------------------------------------------
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--background)] text-[var(--foreground)] shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit College</h1>

      {error && <p className="text-red-500 text-center mb-3">{error}</p>}
      {message && <p className="text-green-600 text-center mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

        {/* Basic Info */}
        <input name="name" placeholder="College Name" value={formData.name} onChange={handleChange} className="border p-2 rounded"/>

        <input name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} className="border p-2 rounded"/>

        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2 rounded"/>

        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded"/>

        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded"/>

        <input name="nirfRanking" placeholder="NIRF Ranking" value={formData.nirfRanking} onChange={handleChange} className="border p-2 rounded"/>

        <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="border p-2 rounded"/>

        <input name="logoUrl" placeholder="Logo URL" value={formData.logoUrl} onChange={handleChange} className="border p-2 rounded"/>

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded h-24"/>

        {/* Courses */}
        <input name="courses" placeholder="Courses (comma-separated)" value={formData.courses} onChange={handleChange} className="border p-2 rounded"/>

        {/* Affiliation */}
        <input name="affiliation" placeholder="Affiliation" value={formData.affiliation} onChange={handleChange} className="border p-2 rounded"/>

        {/* Type */}
        <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Type</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Deemed">Deemed</option>
          <option value="Autonomous">Autonomous</option>
        </select>

        {/* Admission */}
        <textarea name="admissionProcess" placeholder="Admission Process" value={formData.admissionProcess} onChange={handleChange} className="border p-2 rounded h-20"/>

        {/* Fees */}
        <div className="grid grid-cols-2 gap-4">
          <input name="fees.tuition" placeholder="Tuition Fee" value={formData.fees.tuition} onChange={handleChange} className="border p-2 rounded"/>
          <input name="fees.hostel" placeholder="Hostel Fee" value={formData.fees.hostel} onChange={handleChange} className="border p-2 rounded"/>
          <input name="fees.misc" placeholder="Misc Fee" value={formData.fees.misc} onChange={handleChange} className="border p-2 rounded"/>
          <input name="fees.waiver" placeholder="Waiver Info" value={formData.fees.waiver} onChange={handleChange} className="border p-2 rounded"/>
        </div>

        {/* Cutoff */}
        <input name="cutOff" placeholder="Cut Offs" value={formData.cutOff} onChange={handleChange} className="border p-2 rounded"/>

        {/* Facilities */}
        <input name="facilities" placeholder="Facilities" value={formData.facilities} onChange={handleChange} className="border p-2 rounded"/>

        {/* Stats */}
        <input name="noOfStudents" placeholder="Students" value={formData.noOfStudents} onChange={handleChange} className="border p-2 rounded"/>
        <input name="noOfFaculties" placeholder="Faculties" value={formData.noOfFaculties} onChange={handleChange} className="border p-2 rounded"/>

        {/* Placement */}
        <div className="grid grid-cols-2 gap-4">
          <input name="placement.highest" placeholder="Highest Package" value={formData.placement.highest} onChange={handleChange} className="border p-2 rounded"/>
          <input name="placement.average" placeholder="Average Package" value={formData.placement.average} onChange={handleChange} className="border p-2 rounded"/>
          <input name="placement.median" placeholder="Median" value={formData.placement.median} onChange={handleChange} className="border p-2 rounded"/>
          <input name="placement.ratio" placeholder="Placement %" value={formData.placement.ratio} onChange={handleChange} className="border p-2 rounded"/>
        </div>

        <input name="placement.recruiters" placeholder="Recruiters" value={formData.placement.recruiters} onChange={handleChange} className="border p-2 rounded"/>

        {/* URLs */}
        <input name="websiteUrl" placeholder="Website" value={formData.websiteUrl} onChange={handleChange} className="border p-2 rounded"/>
        <input name="nirfPdf" placeholder="NIRF PDF" value={formData.nirfPdf} onChange={handleChange} className="border p-2 rounded"/>
        <input name="virtualTourLink" placeholder="Virtual Tour" value={formData.virtualTourLink} onChange={handleChange} className="border p-2 rounded"/>

        <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {loading ? "Updating..." : "Update College"}
        </button>
      </form>
    </div>
  );
}
