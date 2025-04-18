"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddCollegePage() {
  const [colleges, setColleges] = useState([]);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
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
    averagePlacement: "",
    medianSalary: "",
    websiteUrl: "",
    pastRecruitor: "",
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
          averagePlacement: "",
          medianSalary: "",
          websiteUrl: "",
          pastRecruitor: "",
        });
      }
    } catch (error) {
      setMessage("Error adding college");
    }

    setLoading(false);
  };

  // Fetch colleges from API
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
      setLoading(false);
    };

    fetchColleges();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading colleges...</p>;

  return (
    <section className="bg-gray-100">
      <div className="max-w-5/6 mx-auto p-6 shadow-md rounded-lg bg-white">
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
            name="nirfRanking"
            placeholder="Nirf Ranking"
            value={formData.nirfRanking}
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
            required
          />
          <input
            type="url"
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
            placeholder="Courses"
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
            type="url"
            name="pastRecruitor"
            placeholder="Past Recruitor Image URL"
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
            {loading ? "Adding..." : "Add College"}
          </button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h1 className="text-2xl font-bold mb-6">College List</h1>

        {colleges.length === 0 ? (
          <p className="text-center">No colleges found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college) => (
              <div
                key={college._id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col mb-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={college.logoUrl}
                    alt={`${college.name} logo`}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <span className="text-sm font-medium text-gray-600">
                    #{college.nirfRanking}
                  </span>
                </div>

                <img
                  src={college.imageUrl}
                  alt={college.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />

                <h2 className="text-xl font-bold mb-1">{college.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{college.location}</p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Affiliation:</span>{" "}
                  {college.affiliation}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Type:</span> {college.type}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Courses:</span>{" "}
                  {college.courses}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Facilities:</span>{" "}
                  {college.facilities}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Students:</span>{" "}
                  {college.noOfStudents}
                  &nbsp; | &nbsp;
                  <span className="font-semibold">Faculties:</span>{" "}
                  {college.noOfFaculties}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Admission:</span>{" "}
                  {college.admissionProcess}
                  {/* Admission process is to long for shown! */}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Fees:</span> ₹{college.fees}
                  <br />
                  <span className="font-semibold">Hostel:</span> ₹
                  {college.hostelFees}
                  <br />
                  <span className="font-semibold">Other:</span> ₹
                  {college.otherFees}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Placement:</span>{" "}
                  {college.averagePlacement}
                  <br />
                  <span className="font-semibold">Median Salary:</span> ₹
                  {college.medianSalary}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {college.description.slice(0, 100) + "..."}
                </p>

                <div className="my-3">
                  <img
                    src={college.pastRecruitor}
                    alt="Past Recruitor"
                    className="w-full h-20 object-cover rounded-md"
                  />
                </div>

                <div className="mt-auto flex justify-between items-center">
                  <a
                    href={college.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Visit Website
                  </a>
                  <button
                    onClick={() =>
                      router.push(`/admin/colleges/${college._id}`)
                    }
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
