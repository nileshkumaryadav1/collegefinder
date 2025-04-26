"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCollegePage() {
  const { slug } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
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
    fees: "",
    hostelFees: "",
    otherFees: "",
    feeWaiver: "",
    cutOff: "",
    facilities: "",
    noOfStudents: "",
    noOfFaculties: "",
    highestPlacement: "",
    averagePlacement: "",
    medianSalary: "",
    websiteUrl: "",
    placementRatio: "",
    pastRecruitor: "",
    nirfPdf: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Fetch existing college details
  useEffect(() => {
    if (!slug) return;

    const fetchCollege = async () => {
      try {
        const res = await fetch(`/api/colleges/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch college");

        const data = await res.json();
        setFormData(data.data);
      } catch (err) {
        console.error("Error fetching college details:", err);
        setError("Failed to load college details. Please try again.");
      }
    };

    fetchCollege();
  }, [slug]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(`/api/colleges/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update college");
      }

      setMessage("✅ College updated successfully!");
      router.push("/admin/colleges");
    } catch (err) {
      console.error("Error updating college:", err);
      setError(err.message || "Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit College</h1>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {/* All Inputs */}
        {[
          { name: "name", placeholder: "College Name" },
          { name: "slug", placeholder: "Slug" },
          { name: "location", placeholder: "Location" },
          { name: "phone", placeholder: "Phone" },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "nirfRanking", placeholder: "NIRF Ranking", type: "number" },
          { name: "imageUrl", placeholder: "Image URL" },
          { name: "logoUrl", placeholder: "Logo URL" },
          { name: "courses", placeholder: "Courses Offered" },
          { name: "affiliation", placeholder: "Affiliation" },
          { name: "type", placeholder: "Type" },
          { name: "facilities", placeholder: "Facilities" },
          { name: "noOfStudents", placeholder: "Number of Students", type: "number" },
          { name: "noOfFaculties", placeholder: "Number of Faculties", type: "number" },
          { name: "fees", placeholder: "Fees" },
          { name: "hostelFees", placeholder: "Hostel Fees" },
          { name: "otherFees", placeholder: "Other Fees" },
          { name: "feeWaiver", placeholder: "Fee Waiver" },
          { name: "highestPlacement", placeholder: "Highest Placement" },
          { name: "averagePlacement", placeholder: "Average Placement" },
          { name: "medianSalary", placeholder: "Median Salary" },
          { name: "websiteUrl", placeholder: "Website URL", type: "url" },
          { name: "placementRatio", placeholder: "Placement Ratio" },
          { name: "pastRecruitor", placeholder: "Past Recruiters Image URL" },
          { name: "nirfPdf", placeholder: "NIRF PDF URL", type: "url" },
        ].map(({ name, placeholder, type = "text" }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        ))}

        {/* Textareas */}
        {[
          { name: "description", placeholder: "Description" },
          { name: "admissionProcess", placeholder: "Admission Process" },
          { name: "cutOff", placeholder: "Cut-off" },
        ].map(({ name, placeholder }) => (
          <textarea
            key={name}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            className="border p-2 rounded w-full h-32"
            required
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg mt-4"
        >
          {loading ? "Updating..." : "Update College"}
        </button>
      </form>
    </div>
  );
}
