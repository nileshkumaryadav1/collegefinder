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
    facilities: "",
    noOfStudents: "",
    noOfFaculties: "",
    averagePlacement: "",
    medianSalary: "",
    websiteUrl: "",
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
          facilities: "",
          noOfStudents: "",
          noOfFaculties: "",
          averagePlacement: "",
          medianSalary: "",
          websiteUrl: "",
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
    <>
      <div className="max-w-5/6 mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
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
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add College"}
          </button>
        </form>
      </div>

      <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">College List</h1>

        {loading ? (
          <p>Loading colleges...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Nirf Ranking</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Logo</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Courses</th>
                <th className="border p-2">Affiliation</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Facilities</th>
                <th className="border p-2">No. of Students</th>
                <th className="border p-2">No. of Faculties</th>
                <th className="border p-2">Admission Process</th>
                <th className="border p-2">Fees</th>
                <th className="border p-2">Average Placement</th>
                <th className="border p-2">Median Salary</th>
                <th className="border p-2">Website</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {colleges.length > 0 ? (
                colleges.map((college) => (
                  <tr key={college._id} className="text-center">
                    <td className="border p-2">{college.name}</td>
                    <td className="border p-2">{college.location}</td>
                    <td className="border p-2">{college.nirfRanking}</td>
                    <td className="border p-2">
                      <img
                        src={college.imageUrl}
                        alt={college.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-md"
                      />
                    </td>
                    <td className="border p-2">
                      <img
                        src={college.logoUrl}
                        alt={college.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-md"
                      />
                    </td>
                    <td className="border p-2">{college.description}</td>
                    <td className="border p-2">{college.courses}</td>
                    <td className="border p-2">{college.affiliation}</td>
                    <td className="border p-2">{college.type}</td>
                    <td className="border p-2">{college.facilities}</td>
                    <td className="border p-2">{college.noOfStudents}</td>
                    <td className="border p-2">{college.noOfFaculties}</td>
                    <td className="border p-2">{college.admissionProcess}</td>
                    <td className="border p-2">{college.fees}</td>
                    <td className="border p-2">{college.averagePlacement}</td>
                    <td className="border p-2">{college.medianSalary}</td>
                    <td className="border p-2">
                      <a
                        href={college.websiteUrl}
                        target="_blank"
                        className="text-blue-500"
                      >
                        Visit Website
                      </a>
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/colleges/${college._id}`)
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No colleges found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
