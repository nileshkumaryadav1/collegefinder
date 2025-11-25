"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MapPin,
  Star,
  BookOpen,
  Users,
  Globe,
  User,
  BookUser,
  Notebook,
  BedSingle,
  Wallet,
  Landmark,
  School,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import ExamCardSmall from "./ExamCardSmall";
import SmallCardOfInsights from "./SmallCardOfInsights";
import FAQs from "./FaQs";
import ReviewRating from "./ReviewRating";
import CollegeCardForHome from "./CollegeCardForHome";

function Row({ label, value }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex gap-4 py-1">
      <div className="w-40 text-sm text-gray-600">{label}</div>
      <div className="text-sm text-gray-800 break-words">{value}</div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
      {children}
    </span>
  );
}

export default function SingleCollegePage({ college }) {
  const [openSections, setOpenSections] = useState({
    basics: true,
    institutional: true,
    academics: true,
    fees: true,
    facilities: true,
    placements: true,
    rankings: true,
    seo: true,
    analytics: false,
    metadata: false,
    gallery: true,
    contact: true,
  });

  if (!college) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        College not found
      </div>
    );
  }

  const toggle = (key) => setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const safe = (v, fallback = "N/A") =>
    v === undefined || v === null || v === "" ? fallback : v;

  console.log(college);

  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Banner and Logo */}
          <div className="relative w-full md:w-1/2 h-64 md:h-96 mb-6">
            <Image
              src={college.imageUrl}
              alt="College Image"
              width={1300}
              height={500}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <Image
                src={college.logoUrl}
                alt="College Logo"
                width={100}
                height={100}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg bg-white"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{college.name}</h1>
            <p className="text-gray-600 mt-1">
              {college.shortName ? `${college.shortName} • ` : ""}
              {college.location ? college.location : ""}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {college.type && <Badge>{college.type}</Badge>}
              {college.affiliation && <Badge>{college.affiliation}</Badge>}
              {college.university && <Badge>{college.university}</Badge>}
              {college.nirfRanking !== undefined && (
                <Badge>NIRF: {college.nirfRanking}</Badge>
              )}
              {college.approvedBy?.length > 0 && (
                <Badge>{college.approvedBy.join(", ")}</Badge>
              )}
              {college.accreditedBy?.length > 0 && (
                <Badge>{college.accreditedBy.join(", ")}</Badge>
              )}
            </div>

            {/* Upadeted and Virtual tour */}
            <div className="text-sm text-gray-500">
              {college.state || ""} {college.city ? ` • ${college.city}` : ""}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {college.websiteUrl && (
                <a
                  href={college.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline"
                >
                  Visit website
                </a>
              )}
              {college.virtualTourLink && (
                <a
                  href={college.virtualTourLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline"
                >
                  Virtual tour
                </a>
              )}
              <div className="text-xs text-gray-400 mt-2">
                Last updated:{" "}
                {college.updatedAt
                  ? new Date(college.updatedAt).toLocaleString()
                  : college.createdAt
                    ? new Date(college.createdAt).toLocaleString()
                    : "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center border-t border-gray-200 bg-gray-50 py-4 px-2 text-sm     md:text-base">
        {[
          { id: "overview", label: "Overview", icon: Landmark },
          { id: "about", label: "About", icon: BookUser },
          { id: "courses", label: "Courses", icon: Notebook },
          { id: "admission", label: "Admission", icon: BedSingle },
          { id: "fees", label: "Fees", icon: Wallet },
          { id: "facilities", label: "Facilities", icon: School },
          { id: "cutoff", label: "Cutoff", icon: Wallet },
          { id: "placement", label: "Placement", icon: Wallet },
          { id: "reviews", label: "Reviews", icon: Star },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="mx-3 my-2.5 flex items-center text-gray-600 hover:text-blue-600 transition md:hover:translate-y-1"
            title={item.label}
            aria-label="scroll to College section"
          >
            <item.icon size={18} className="mr-1" />
            {item.label}
          </a>
        ))}
      </div>

      {/* Sections container */}
      <div className="max-w-6xl mx-auto mt-6 space-y-6">
        {/* About */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            {safe(
              college.about || college.description,
              "No description added."
            )}
          </p>
          {/* virtual tour */}
          {college.virtualTourLink && (
            <section id="virtualTour" title="🎥 Virtual Tour">
              <div className="md:mt-10">
                {/* <h2 className="text-2xl font-bold mb-4">🎥 Virtual Tour</h2> */}
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={college.virtualTourLink.replace("watch?v=", "embed/")}
                    title="Virtual College Tour"
                    allowFullScreen
                    className="w-full md:h-100 rounded-lg shadow-md"
                  ></iframe>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow">
          <button
            onClick={() => toggle("basics")}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="text-xs text-gray-500 mt-1">
                Core details, address, contact and identifiers
              </div>
            </div>
            <div className="text-gray-500">
              {openSections.basics ? "Hide" : "Show"}
            </div>
          </button>

          {openSections.basics && (
            <div className="p-6 border-t">
              <Row label="Name" value={college.name} />
              <Row label="Slug" value={college.slug} />
              <Row label="Short Name" value={college.shortName} />
              <Row label="Established" value={college.establishedYear} />
              <Row label="Address" value={college.address} />
              <Row label="State" value={college.state} />
              <Row label="City" value={college.city} />
              <Row label="Pincode" value={college.pincode} />
              <Row label="Location" value={college.location} />
              <Row
                label="Phone"
                value={
                  college.phone ? (
                    <a href={`tel:${college.phone}`} className="underline">
                      {college.phone}
                    </a>
                  ) : null
                }
              />
              <Row
                label="Email"
                value={
                  college.email ? (
                    <a href={`mailto:${college.email}`} className="underline">
                      {college.email}
                    </a>
                  ) : null
                }
              />
              <Row label="Last updated by" value={college.lastUpdatedBy} />
            </div>
          )}
        </div>

        {/* Institutional Details */}
        <div className="bg-white rounded-xl shadow">
          <button
            onClick={() => toggle("institutional")}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">Institutional Details</h3>
              <div className="text-xs text-gray-500 mt-1">
                Type, approvals, departments, governing body
              </div>
            </div>
            <div className="text-gray-500">
              {openSections.institutional ? "Hide" : "Show"}
            </div>
          </button>

          {openSections.institutional && (
            <div className="p-6 border-t">
              <Row label="Type" value={college.type} />
              <Row label="Affiliation" value={college.affiliation} />
              <Row
                label="Approved By"
                value={
                  college.approvedBy?.length
                    ? college.approvedBy.join(", ")
                    : null
                }
              />
              <Row
                label="Accredited By"
                value={
                  college.accreditedBy?.length
                    ? college.accreditedBy.join(", ")
                    : null
                }
              />
              <Row label="Governing Body" value={college.governingBody} />
              <Row label="University" value={college.university} />
              <Row
                label="Departments"
                value={
                  college.departments?.length
                    ? college.departments.join(", ")
                    : null
                }
              />
              <Row label="Description" value={college.description} />
            </div>
          )}
        </div>
        {/* promotion */}
        <section id="promotion" title="">
          <div className="text-gray-700 mx-auto leading-relaxed space-y-2 text-left">
            {/* {college.promotion
            ? college.promotion
                .split(".")
                .filter((sentence) => sentence.trim().length > 0)
                .map((sentence, index) => <p key={index}>{sentence.trim()}.</p>)
            : "Promotion information not available."} */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl md:w-4/6 mx-auto shadow md:p-10 p-5">
              <h4 className="text-2xl font-bold text-gray-800 md:mb-5 mb-3 text-center">
                Promotions
              </h4>
              <ul className="text-sm text-blue-700 list-disc list-inside space-y-2">
                <li>
                  <Link href="/colleges" className="hover:underline">
                    Top Engineering Colleges in India 2025
                  </Link>
                </li>
                <li>
                  <Link href="/exams" className="hover:underline">
                    How to Crack JEE Advanced – Strategy Guide
                  </Link>
                </li>
                <li>
                  <Link href="/sponsors" className="hover:underline">
                    Free Counseling by Experts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Academics (Courses + Cutoffs) */}
        <div className="bg-white rounded-xl shadow">
          <button
            onClick={() => toggle("academics")}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">Academic Information</h3>
              <div className="text-xs text-gray-500 mt-1">
                Courses, eligibility, intake, entrance exams, cutoffs
              </div>
            </div>
            <div className="text-gray-500">
              {openSections.academics ? "Hide" : "Show"}
            </div>
          </button>

          {openSections.academics && (
            <div className="p-6 border-t space-y-6">
              {/* Courses Offered */}
              <div>
                <h4 className="font-semibold mb-3">Courses Offered</h4>
                {college.coursesOffered?.length > 0 ? (
                  <div className="grid gap-4">
                    {college.coursesOffered.map((c, idx) => (
                      <div key={idx} className="border rounded p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-lg font-semibold">
                              {c.program} — {c.specialization}
                            </div>
                            <div className="text-sm text-gray-500">
                              {c.duration ? `${c.duration} • ` : ""}
                              {c.mode ? `${c.mode}` : ""}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            Intake: {c.intake ?? "N/A"}
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                          <div>Eligibility: {safe(c.eligibility, "N/A")}</div>
                          <div>
                            Entrance Exams:{" "}
                            {c.entranceExams?.length
                              ? c.entranceExams.join(", ")
                              : "N/A"}
                          </div>
                          <div>Fees: {c.totalFees || "N/A"}</div>
                          <div>Hostel Fees: {c.hostelFees || "N/A"}</div>
                          <div>Fee Waiver: {c.feeWaiver || "N/A"}</div>
                          <div>
                            Syllabus:{" "}
                            {c.syllabusPdf ? (
                              <a
                                href={c.syllabusPdf}
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                              >
                                Download
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No courses added.</div>
                )}
              </div>

              {/* Cut Offs */}
              <div>
                <h4 className="font-semibold mb-3">Cut Offs</h4>
                {college.cutOff?.length > 0 ? (
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left text-xs text-gray-500 border-b">
                        <tr>
                          <th className="py-2 pr-4">Year</th>
                          <th className="py-2 pr-4">Program</th>
                          <th className="py-2 pr-4">Specialization</th>
                          <th className="py-2 pr-4">Category</th>
                          <th className="py-2 pr-4">Exam</th>
                          <th className="py-2 pr-4">Closing Rank</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {college.cutOff?.map((co, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-2 pr-4">{co.year ?? "-"}</td>
                            <td className="py-2 pr-4">{co.program ?? "-"}</td>
                            <td className="py-2 pr-4">
                              {co.specialization ?? "-"}
                            </td>
                            <td className="py-2 pr-4">{co.category ?? "-"}</td>
                            <td className="py-2 pr-4">{co.exam ?? "-"}</td>
                            <td className="py-2 pr-4">
                              {co.closingRank ?? "-"}
                            </td>
                          </tr>
                        ))} */}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-gray-500">No cut-off data.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Fees & Scholarships */}
        <div className="bg-white rounded-xl shadow">
          <button
            onClick={() => toggle("fees")}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">Fees & Scholarships</h3>
              <div className="text-xs text-gray-500 mt-1">
                Tuition, hostel, payments and scholarships
              </div>
            </div>
            <div className="text-gray-500">
              {openSections.fees ? "Hide" : "Show"}
            </div>
          </button>

          {openSections.fees && (
            <div className="p-6 border-t">
              <Row label="Tuition" value={college.fees?.tuition} />
              <Row label="Hostel" value={college.fees?.hostel} />
              <Row label="Misc" value={college.fees?.misc} />
              <Row
                label="Waiver"
                value={college.fees?.waiver
                  ?.split(".")
                  .filter((sentence) => sentence.trim().length > 0)
                  .map((sentence, index) => (
                    <p key={index} className="mb-3 text-gray-800 text-justify">
                      {index + 1}
                      {")" + " "}
                      {sentence.trim()}.
                    </p>
                  ))}
              />
              <Row label="Total" value={college.fees?.total} />
              <Row
                label="Payment Modes"
                value={
                  college.fees?.modeOfPayment?.length
                    ? college.fees.modeOfPayment.join(", ")
                    : null
                }
              />
              <Row
                label="Scholarship Available"
                value={college.fees?.scholarshipAvailable ? "Yes" : "No"}
              />

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Scholarships</h4>
                {college.scholarships?.length > 0 ? (
                  <div className="grid gap-3">
                    {college.scholarships.map((s, i) => (
                      <div key={i} className="border rounded p-3">
                        <div className="font-medium">
                          {s.name || "Untitled"}
                        </div>
                        <div className="text-sm text-gray-600">
                          Eligibility: {s.eligibility || "N/A"}
                        </div>
                        <div className="text-sm text-gray-600">
                          Amount: {s.amount || "N/A"}
                        </div>
                        {s.link && (
                          <a
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm underline"
                          >
                            More
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No scholarships listed.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Facilities */}
        <div className="bg-white rounded-xl shadow">
          <button
            onClick={() => toggle("facilities")}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">Facilities & Campus</h3>
              <div className="text-xs text-gray-500 mt-1">
                Hostels, sports, clubs, campus area
              </div>
            </div>
            <div className="text-gray-500">
              {openSections.facilities ? "Hide" : "Show"}
            </div>
          </button>

          {openSections.facilities && (
            <div className="p-6 border-t">
              <Row label="Campus Area" value={college.campusArea} />
              <div className="mb-3">
                <div className="text-sm text-gray-600 font-medium">Hostels</div>
                <div className="text-sm text-gray-800">
                  Boys: {college.hostels?.boys ? "Yes" : "No"} • Girls:{" "}
                  {college.hostels?.girls ? "Yes" : "No"} • Capacity:{" "}
                  {college.hostels?.capacity || "N/A"}
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  {college.hostels?.description}
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-600 font-medium">
                  Sports Facilities
                </div>
                {college.sportsFacilities?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {college.sportsFacilities.map((s, i) => (
                      <Badge key={i}>{s}</Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">
                    No sports facilities listed.
                  </div>
                )}
                <Image
                  src="https://avit.ac.in/wp-content/uploads/2024/11/facilities-img.webp"
                  alt="College Facilities Image"
                  width={800}
                  height={600}
                  className="mt-6 rounded-lg shadow md:w-7/9 mx-auto"
                />
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-600 font-medium">Clubs</div>
                {college.clubs?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {college.clubs.map((c, i) => (
                      <Badge key={i}>{c}</Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No clubs listed.</div>
                )}
              </div>

              <div>
                <div className="text-sm text-gray-600 font-medium">Events</div>
                {college.events?.length ? (
                  <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                    {college.events.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-500">No events listed.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Placements */}
        <div className="bg-white rounded-xl shadow">
          <button
            onClick={() => toggle("placements")}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">Placements</h3>
              <div className="text-xs text-gray-500 mt-1">
                Stats for B.Tech and M.Tech
              </div>
            </div>
            <div className="text-gray-500">
              {openSections.placements ? "Hide" : "Show"}
            </div>
          </button>

          {openSections.placements && (
            <div className="p-6 border-t space-y-4">
              {/* BTech */}
              <div>
                <h4 className="font-semibold mb-2">B.Tech Placements</h4>
                {college.placements?.BTech ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-gray-500">Highest</div>
                      <div className="text-gray-800">
                        {college.placements.BTech.highest || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Average</div>
                      <div className="text-gray-800">
                        {college.placements.BTech.average || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Median</div>
                      <div className="text-gray-800">
                        {college.placements.BTech.median || "N/A"}
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <div className="text-xs text-gray-500">Recruiters</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(college.placements.BTech.recruiters || []).map(
                          (r, i) => (
                            <Badge key={i}>{r}</Badge>
                          )
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <div className="text-xs text-gray-500">
                        Top Recruiter Logos
                      </div>
                      <div className="flex gap-3 flex-wrap mt-2 items-center">
                        {(college.placements.BTech.topRecruitersLogos || [])
                          .length > 0 ? (
                          college.placements.BTech.topRecruitersLogos.map(
                            (url, i) => (
                              <div
                                key={i}
                                className="w-16 h-10 overflow-hidden rounded bg-gray-50 flex items-center justify-center"
                              >
                                {url ? (
                                  <img
                                    src={url}
                                    alt={`logo-${i}`}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                ) : (
                                  <div className="text-xs text-gray-400">
                                    No logo
                                  </div>
                                )}
                              </div>
                            )
                          )
                        ) : (
                          <div className="text-gray-500">No logos</div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <div className="text-xs text-gray-500">
                        Placement Report
                      </div>
                      <div className="mt-2">
                        {college.placements.BTech.placementReportPdf ? (
                          <a
                            href={college.placements.BTech.placementReportPdf}
                            target="_blank"
                            rel="noreferrer"
                            className="underline"
                          >
                            Download report (PDF)
                          </a>
                        ) : (
                          <div className="text-gray-500">
                            No report available
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Yearwise stats */}
                    <div className="md:col-span-3 mt-2">
                      <div className="text-xs text-gray-500">
                        Yearwise Stats
                      </div>
                      {college.placements.BTech.yearwiseStats?.length ? (
                        <div className="overflow-auto mt-2">
                          <table className="w-full text-sm">
                            <thead className="text-left text-xs text-gray-500 border-b">
                              <tr>
                                <th className="py-2 pr-4">Year</th>
                                <th className="py-2 pr-4">Highest</th>
                                <th className="py-2 pr-4">Average</th>
                                <th className="py-2 pr-4">Median</th>
                                <th className="py-2 pr-4">Placed</th>
                                <th className="py-2 pr-4">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {college.placements.BTech.yearwiseStats.map(
                                (y, i) => (
                                  <tr key={i} className="border-b">
                                    <td className="py-2 pr-4">
                                      {y.year ?? "-"}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {y.highest ?? "-"}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {y.average ?? "-"}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {y.median ?? "-"}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {y.placedStudents ?? "-"}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {y.totalStudents ?? "-"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-gray-500">No yearwise stats.</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">No B.Tech placement data.</div>
                )}
              </div>

              {/* MTech */}
              <div>
                <h4 className="font-semibold mb-2">M.Tech Placements</h4>
                {college.placements?.MTech ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-gray-500">Highest</div>
                      <div className="text-gray-800">
                        {college.placements.MTech.highest || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Average</div>
                      <div className="text-gray-800">
                        {college.placements.MTech.average || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Median</div>
                      <div className="text-gray-800">
                        {college.placements.MTech.median || "N/A"}
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <div className="text-xs text-gray-500">Recruiters</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(college.placements.MTech.recruiters || []).map(
                          (r, i) => (
                            <Badge key={i}>{r}</Badge>
                          )
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <div className="text-xs text-gray-500">
                        Placement Report
                      </div>
                      <div className="mt-2">
                        {college.placements.MTech.placementReportPdf ? (
                          <a
                            href={college.placements.MTech.placementReportPdf}
                            target="_blank"
                            rel="noreferrer"
                            className="underline"
                          >
                            Download report (PDF)
                          </a>
                        ) : (
                          <div className="text-gray-500">
                            No report available
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-3 mt-2">
                      <div className="text-xs text-gray-500">
                        Yearwise Stats
                      </div>
                      {college.placements.MTech.yearwiseStats?.length ? (
                        <div className="overflow-auto mt-2">
                          <table className="w-full text-sm">
                            <thead className="text-left text-xs text-gray-500 border-b">
                              <tr>
                                <th className="py-2 pr-4">Year</th>
                                <th className="py-2 pr-4">Highest</th>
                                <th className="py-2 pr-4">Average</th>
                                <th className="py-2 pr-4">Median</th>
                                <th className="py-2 pr-4">Placed</th>
                                <th className="py-2 pr-4">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {college.placements.MTech.yearwiseStats.map(
                                (y, i) => (
                                  <tr key={i} className="border-b">
                                    <td className="py-2 pr-4">
                                      {y.year ?? "-"}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {y.highest ?? "-"}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {y.average ?? "-"}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {y.median ?? "-"}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {y.placedStudents ?? "-"}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {y.totalStudents ?? "-"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-gray-500">No yearwise stats.</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">No M.Tech placement data.</div>
                )}
              </div>

              <Row
                label="Placement Cell Contact"
                value={college.placements?.placementCellContact}
              />
            </div>
          )}
        </div>

        {/* Rankings */}
        <div className="bg-white rounded-xl shadow">
          <button
            onClick={() => toggle("rankings")}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">Rankings & Recognition</h3>
              <div className="text-xs text-gray-500 mt-1">
                NIRF, other rankings, PDFs
              </div>
            </div>
            <div className="text-gray-500">
              {openSections.rankings ? "Hide" : "Show"}
            </div>
          </button>

          {openSections.rankings && (
            <div className="p-6 border-t">
              <Row label="NIRF Ranking" value={college.nirfRanking} />
              <Row
                label="NIRF PDF"
                value={
                  college.nirfPdf ? (
                    <a
                      href={college.nirfPdf}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Download
                    </a>
                  ) : null
                }
              />

              <div className="mt-4">
                <div className="text-sm font-medium text-gray-600">
                  Other Rankings
                </div>
                {college.otherRankings?.length > 0 ? (
                  <ul className="mt-2 text-sm">
                    {college.otherRankings.map((r, i) => (
                      <li key={i}>
                        {r.source ?? "Source"} — {r.year ?? "-"} — Rank:{" "}
                        {r.rank ?? "-"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-500">No other rankings.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-xl shadow">
          <button
            onClick={() => toggle("gallery")}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">Gallery</h3>
              <div className="text-xs text-gray-500 mt-1">Campus images</div>
            </div>
            <div className="text-gray-500">
              {openSections.gallery ? "Hide" : "Show"}
            </div>
          </button>

          {openSections.gallery && (
            <div className="p-6 border-t">
              {college.gallery?.length ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {college.gallery.map((g, i) => (
                    <div
                      key={i}
                      className="rounded overflow-hidden bg-gray-50 h-40 relative"
                    >
                      {g ? (
                        // Using <img> instead of next/Image to avoid domain config issues
                        <img
                          src={g}
                          alt={`gallery-${i}`}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">No gallery images.</div>
              )}
            </div>
          )}
        </div>

        {/* Contact & Social */}
        <div className="bg-white rounded-xl shadow">
          <button
            onClick={() => toggle("contact")}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">Contact & Social Links</h3>
              <div className="text-xs text-gray-500 mt-1">
                Email, phone & social presence
              </div>
            </div>
            <div className="text-gray-500">
              {openSections.contact ? "Hide" : "Show"}
            </div>
          </button>

          {openSections.contact && (
            <div className="p-6 border-t">
              <Row
                label="Email"
                value={
                  college.email ? (
                    <a href={`mailto:${college.email}`} className="underline">
                      {college.email}
                    </a>
                  ) : null
                }
              />
              <Row
                label="Phone"
                value={
                  college.phone ? (
                    <a href={`tel:${college.phone}`} className="underline">
                      {college.phone}
                    </a>
                  ) : null
                }
              />
              <Row
                label="Website"
                value={
                  college.websiteUrl ? (
                    <a
                      href={college.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      {college.websiteUrl}
                    </a>
                  ) : null
                }
              />

              <div className="mt-3">
                <div className="text-sm text-gray-600 font-medium">Social</div>
                <div className="flex gap-3 mt-2">
                  {Object.entries(college.socialLinks || {}).map(([k, v]) =>
                    v ? (
                      <a
                        key={k}
                        href={v}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm underline"
                      >
                        {k}
                      </a>
                    ) : null
                  )}
                  {Object.values(college.socialLinks || {}).filter(Boolean)
                    .length === 0 && (
                    <div className="text-gray-500">No social links.</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Analytics, SEO, Metadata */}
        <div className="bg-white rounded-xl shadow grid md:grid-cols-3">
          <div className="p-6 border-b md:border-b-0 md:border-r">
            <h4 className="font-semibold">Analytics & Engagement</h4>
            <Row label="Views" value={college.views} />
            <Row label="Likes" value={college.likes} />
            <Row label="Favorites" value={college.favorites} />
            <Row label="Rating" value={college.rating} />
            <Row label="Review Count" value={college.reviewCount} />
            <Row label="Share Count" value={college.shareCount} />
            <Row label="Approved" value={college.approved ? "Yes" : "No"} />
          </div>

          <div className="p-6 border-b md:border-b-0 md:border-r">
            <h4 className="font-semibold">SEO</h4>
            <Row label="SEO Title" value={college.seo?.title} />
            <Row label="SEO Description" value={college.seo?.description} />
            <Row
              label="SEO Keywords"
              value={
                college.seo?.keywords?.length
                  ? college.seo.keywords.join(", ")
                  : null
              }
            />
            <Row label="Canonical URL" value={college.seo?.canonicalUrl} />
            <Row
              label="Keywords (model)"
              value={
                college.keywords?.length ? college.keywords.join(", ") : null
              }
            />
            <Row
              label="Tags"
              value={college.tags?.length ? college.tags.join(", ") : null}
            />
          </div>

          <div className="p-6">
            <h4 className="font-semibold">Metadata</h4>
            <Row label="Number of Students" value={college.noOfStudents} />
            <Row label="Number of Faculties" value={college.noOfFaculties} />
            <Row label="Verified" value={college.verified ? "Yes" : "No"} />
            <Row label="Last Updated By" value={college.lastUpdatedBy} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 mb-12 text-sm text-gray-500">
        Tip: you can toggle sections to improve readability.
      </div>

      {/* Advertisement & Promotions */}
      <section className="bg-gray-50 flex justify-center mb-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl shadow p-4">
          <h4 className="text-md font-bold text-blue-700 mb-2 text-center">
            Advertisement
          </h4>
          <Link href="/sponsors" className="hover:underline">
            <Image
              src="/sponsors.jpg"
              alt="Advertisement Image"
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </Link>
          <p className="text-xs text-gray-500 mt-2">Sponsored Content</p>
        </div>
      </section>

      {/* reviews */}
      <section
        id="reviews"
        className="w-full py-14 px-4 md:px-8 bg-white border-t border-gray-200"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <ReviewRating collegeId={college._id} />
          </div>
        </div>
      </section>

      {/* faqs */}
      <section
        id="faqs"
        className="w-full py-6 px-4 md:px-8 bg-white border-t border-gray-200"
      >
        <div className="max-w-6xl mx-auto text-center">
          <FAQs data={college.faq} />
          <div className="max-w-4xl mx-auto"></div>
        </div>
      </section>

      {/* similar colleges */}
      <section className="w-full py-14 px-4 md:px-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Similar Colleges
          </h2>
          <Link href="/colleges" className="btn btn-link">
            View all
          </Link>
          <div className="max-w-5xl mx-auto mt-4">
            <CollegeCardForHome
              query="#"
              collegeType=""
              sortBy=""
              sortOrder=""
            />
          </div>
        </div>
      </section>

      {/* similar courses */}
      <section className="w-full py-14 px-4 md:px-8 bg-white border-t border-gray-200 hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">
            Similar Courses
          </h2>
          <div className="max-w-4xl mx-auto">
            {/* <SimilarCourses data={college.similarCourses} /> */}
            <h2>Similar courses are not available for this college.</h2>
          </div>
        </div>
      </section>

      {/* similar exam section */}
      <section className="w-full py-14 px-4 md:px-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Entrance Exams
          </h2>
          <Link href="/exams" className="btn btn-link">
            View all
          </Link>
          <div className="max-w-5xl mx-auto mt-4">
            <ExamCardSmall query="" />
          </div>
        </div>
      </section>

      {/* important insights */}
      <section className="w-full py-14 px-4 md:px-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Important Insights
          </h2>
          <Link href="/news" className="btn btn-link">
            View Updates
          </Link>
          <div className="max-w-5xl mx-auto">
            <SmallCardOfInsights />
          </div>
        </div>
      </section>
    </section>
  );
}
