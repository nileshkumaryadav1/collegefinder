"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCollegePage() {
  const router = useRouter();
  const params = useParams(); // ✅ Use useParams() to unwrap the Promise
  const id = params?.id; // Ensure id is extracted correctly

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    location: "",
    nirfRanking: "",
    imageUrl: "",
    logoUrl: "",
    description: "",
    courses: "",
    affiliation: "",
    type: "",
    admissionProcess: "",
    fees: "",
    hostelFees: "",
    otherFees: "",
    facilities: "",
    noOfStudents: "",
    noOfFaculties: "",
    highestPlacement: "",
    averagePlacement: "",
    medianSalary: "",
    websiteUrl: "",
    placementRatio: "",
    pastRecruitor: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch the existing college details
  useEffect(() => {
    if (!id) return;

    const fetchCollege = async () => {
      try {
        const res = await fetch(`/api/colleges/${id}`);
        if (!res.ok) throw new Error("Failed to fetch college");

        const data = await res.json();
        setFormData(data);
      } catch (error) {
        setMessage("Error fetching college details");
      }
    };

    fetchCollege();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/colleges/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update college");

      setMessage("College updated successfully!");
      router.push("/admin/colleges"); // Redirect after updating
    } catch (error) {
      setMessage("Error updating college");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit College</h1>
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
          name="slug"
          placeholder="Slug" // Add placeholder for slug field
          value={formData.slug}
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
          name="nirfRanking"
          placeholder="NIRF Ranking"
          value={formData.nirfRanking}
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
          required
        />
        <input
          type="text"
          name="logoUrl"
          placeholder="Logo URL"
          value={formData.logoUrl}
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
          type="text"
          name="courses"
          placeholder="Courses Offered"
          value={formData.courses}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="affiliation"
          placeholder="Affiliation"
          value={formData.affiliation}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="facilities"
          placeholder="Facilities"
          value={formData.facilities}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          name="noOfStudents"
          placeholder="Number of Students"
          value={formData.noOfStudents}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          name="noOfFaculties"
          placeholder="Number of Faculties"
          value={formData.noOfFaculties}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="admissionProcess"
          placeholder="Admission Process"
          value={formData.admissionProcess}
          onChange={handleChange}
          className="border p-2 rounded w-full h-24"
          required
        />
        <input
          type="text"
          name="fees"
          placeholder="Fees"
          value={formData.fees}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="hostelFees"
          placeholder="Hostel Fees"
          value={formData.hostelFees}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="otherFees"
          placeholder="Total Fees"
          value={formData.otherFees}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="highestPlacement"
          placeholder="Highest Placement"
          value={formData.highestPlacement}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="averagePlacement"
          placeholder="Average Placement"
          value={formData.averagePlacement}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="medianSalary"
          placeholder="Median Salary"
          value={formData.medianSalary}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="url"
          name="websiteUrl"
          placeholder="Website URL"
          value={formData.websiteUrl}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="placementRatio"
          placeholder="Placement Ratio"
          value={formData.placementRatio}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="pastRecruitor"
          placeholder="Past Recruiters Image URL"
          value={formData.pastRecruitor}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update College"}
        </button>
      </form>
    </div>
  );
}
