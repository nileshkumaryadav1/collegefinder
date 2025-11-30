"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminAddCollegePage() {
  const router = useRouter();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested objects
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...formData,
        courses: formData.courses
          ? formData.courses.split(",").map((c) => c.trim())
          : [],
        facilities: formData.facilities
          ? formData.facilities.split(",").map((f) => f.trim())
          : [],
        placement: {
          ...formData.placement,
          recruiters: formData.placement.recruiters
            ? formData.placement.recruiters.split(",").map((r) => r.trim())
            : [],
        },
        cutOff: formData.cutOff
          ? formData.cutOff.split(",").map((c) => ({ course: c.trim() }))
          : [],
      };

      const res = await fetch("/api/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setMessage(data.message || "College added successfully");

      if (res.ok) {
        setFormData({
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
          fees: { tuition: "", hostel: "", misc: "", waiver: "" },
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
        });
        fetchColleges();
      }

      if (!res.ok) {
        alert(data.error || "Error adding college");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error adding college");
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchColleges = async () => {
    try {
      const res = await fetch("/api/colleges");
      const data = await res.json();
      setColleges(data.colleges || []);
    } catch (err) {
      console.error("Error fetching colleges:", err);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <section className="bg-[var(--background)] text-[var(--foreground)] min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-[var(--background)] text-[var(--foreground)] rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Add a New College</h1>
        {message && (
          <p className="text-center text-gray-700 mb-4 font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Basic Info */}
          <input
            name="name"
            placeholder="College Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="nirfRanking"
            type="number"
            placeholder="NIRF Ranking"
            value={formData.nirfRanking}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="imageUrl"
            placeholder="Main Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="logoUrl"
            placeholder="Logo URL"
            value={formData.logoUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded h-24"
          />

          {/* Academics */}
          <input
            name="courses"
            placeholder="Courses (comma-separated)"
            value={formData.courses}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="affiliation"
            placeholder="Affiliation"
            value={formData.affiliation}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Deemed">Deemed</option>
            <option value="Autonomous">Autonomous</option>
          </select>

          <textarea
            name="admissionProcess"
            placeholder="Admission Process"
            value={formData.admissionProcess}
            onChange={handleChange}
            className="border p-2 rounded h-20"
          />

          {/* Fees */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="fees.tuition"
              placeholder="Tuition Fee"
              value={formData.fees.tuition}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="fees.hostel"
              placeholder="Hostel Fee"
              value={formData.fees.hostel}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="fees.misc"
              placeholder="Miscellaneous Fee"
              value={formData.fees.misc}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="fees.waiver"
              placeholder="Fee Waiver Info"
              value={formData.fees.waiver}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          {/* Cutoff */}
          <input
            name="cutOff"
            placeholder="Cut Offs (comma-separated courses)"
            value={formData.cutOff}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Facilities */}
          <input
            name="facilities"
            placeholder="Facilities (comma-separated)"
            value={formData.facilities}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Stats */}
          <input
            name="noOfStudents"
            type="number"
            placeholder="No. of Students"
            value={formData.noOfStudents}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="noOfFaculties"
            type="number"
            placeholder="No. of Faculties"
            value={formData.noOfFaculties}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Placement */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="placement.highest"
              placeholder="Highest Package"
              value={formData.placement.highest}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="placement.average"
              placeholder="Average Package"
              value={formData.placement.average}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="placement.median"
              placeholder="Median Salary"
              value={formData.placement.median}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="placement.ratio"
              placeholder="Placement Ratio (in %)"
              value={formData.placement.ratio}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <input
            name="placement.recruiters"
            placeholder="Top Recruiters (comma-separated)"
            value={formData.placement.recruiters}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* URLs */}
          <input
            name="websiteUrl"
            placeholder="Website URL"
            value={formData.websiteUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="nirfPdf"
            placeholder="NIRF PDF URL"
            value={formData.nirfPdf}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="virtualTourLink"
            placeholder="Virtual Tour Link (YouTube Embed)"
            value={formData.virtualTourLink}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add College"}
          </button>
        </form>
      </div>

      {/* College List */}
      <div className="max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Existing Colleges ({colleges.length})
        </h2>
        {colleges.length === 0 ? (
          <p>No colleges yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <div key={college._id} className="bg-[var(--background)] text-[var(--foreground)] border p-4 rounded-lg shadow">
                <Image
                  src={college.logoUrl}
                  alt={college.name}
                  width={80}
                  height={80}
                  className="rounded mb-2 object-contain"
                />
                <h3 className="font-bold text-lg">{college.name}</h3>
                <p className="text-sm text-gray-500">{college.location}</p>
                <p className="text-sm text-gray-700 mt-2">
                  {/* {college?.courses?.join(", ")} */}
                </p>
                <button
                  onClick={() => router.push(`/admin/colleges/${college.slug}`)}
                  className="mt-3 text-yellow-500 hover:bg-yellow-600 text-sm w-full py-2 rounded border border-yellow-500 cursor-pointer hover:text-white transition-colors duration-300"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
