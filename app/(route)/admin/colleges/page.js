"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddCollegePage() {
  const [colleges, setColleges] = useState([]);
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
    virtualTourLink: "",
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
          virtualTourLink: "",
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

  if (loading) return <p className="text-center p-30">Loading colleges...</p>;

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
            name="slug"
            placeholder="Slug"
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
            type="text"
            name="phone"
            placeholder="College Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
          <input
            type="text"
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
            placeholder="Academic Fees"
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
            name="feeWaiver"
            placeholder="Fee Waiver"
            value={formData.feeWaiver}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <textarea
            name="cutOff"
            placeholder="Cut Off"
            value={formData.cutOff}
            onChange={handleChange}
            className="border p-2 rounded w-full h-24"
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
            type="url"
            name="placementRatio"
            placeholder="Placement Ratio Image URL"
            value={formData.placementRatio}
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
          <input
            type="url"
            name="nirfPdf"
            placeholder="Nirf Data"
            value={formData.nirfPdf}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="virtualTourLink"
            placeholder="Virtual Tour Link"
            value={formData.virtualTourLink}
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

      {/* college manage list */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h1 className="text-2xl font-bold mb-6">College List</h1>

        {colleges.length === 0 ? (
          <p className="text-center">No colleges found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college) => (
              <div
                key={college.slug}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col mb-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <Image
                    src={college.logoUrl}
                    alt={`${college.name} logo`}
                    width={100}
                    height={100}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <span className="text-sm font-medium text-gray-600">
                    #{college.nirfRanking}
                  </span>
                </div>

                <Image
                  src={college.imageUrl}
                  alt={college.name}
                  width={400}
                  height={300}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />

                <h2 className="text-xl font-bold mb-1">{college.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{college.location}</p>
                <p className="text-gray-600 text-sm mb-2">{college.phone}</p>
                <p className="text-gray-600 text-sm mb-2">{college.email}</p>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Slug:</strong> {college.slug}
                </p>

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
                  {/* {college.admissionProcess} */}
                  {college.admissionProcess?.slice(0, 100) + "..."}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Academic:</span> ₹
                  {college.fees}
                  <br />
                  <span className="font-semibold">Hostel:</span> ₹
                  {college.hostelFees}
                  <br />
                  <span className="font-semibold">Total:</span> ₹
                  {college.otherFees}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Fee Waiver:</span>{" "}
                  {college.feeWaiver?.slice(0, 50) + "..."}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Cut Off:</span>{" "}
                  {college.cutOff?.slice(0, 50) + "..."}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Highest Placement:</span>{" "}
                  {college.highestPlacement}
                  <br />
                  <span className="font-semibold">Placement:</span>{" "}
                  {college.averagePlacement}
                  <br />
                  <span className="font-semibold">Median Salary:</span> ₹
                  {college.medianSalary}
                </p>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {college.description?.slice(0, 50) + "..."}
                </p>

                <div className="my-3">
                  <Image
                    src={college.placementRatio}
                    alt="Placement Ratio"
                    width={400}
                    height={300}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <Image
                    src={college.pastRecruitor}
                    alt="Past Recruitor"
                    width={400}
                    height={300}
                    className="w-full h-20 object-cover rounded-md"
                  />
                </div>

                {/* <div>{college.virtualTourLink}</div> */}
                {/* virtual tour */}
                {college.virtualTourLink && (
                  <section id="virtualTour" title="🎥 Virtual Tour">
                    <div className="">
                      {/* <h2 className="text-2xl font-bold mb-4">🎥 Virtual Tour</h2> */}
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={college.virtualTourLink.replace(
                            "watch?v=",
                            "embed/"
                          )}
                          title="Virtual College Tour"
                          allowFullScreen
                          className="w-full h-30 rounded-lg shadow-md"
                        ></iframe>
                      </div>
                    </div>
                  </section>
                )}

                <div className="mt-auto flex justify-between items-center">
                  <a
                    href={college.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Visit Website
                  </a>
                  <a
                    href={college.nirfPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link font-medium hover:underline"
                  >
                    NIRF Report
                  </a>
                  <button
                    onClick={() =>
                      router.push(`/admin/colleges/${college.slug}`)
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
