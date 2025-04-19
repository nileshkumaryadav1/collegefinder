"use client";

import { useState } from "react";
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
  Building2,
  School,
} from "lucide-react";
import Link from "next/link";

const SingleCollegeCard = ({ college }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header Section */}
      <div className="w-full bg-white border rounded-lg shadow-md overflow-hidden">
        <div className="relative w-full h-64 md:h-96">
          <img
            src={college.imageUrl}
            alt={college.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={college.logoUrl}
              alt={`${college.name} logo`}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg bg-white"
            />
          </div>
        </div>
        <div className="pt-16 pb-8 px-4 md:px-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold">{college.name}</h1>
          <p className="text-gray-600 mt-2 flex justify-center items-center gap-2">
            <MapPin size={18} /> {college.location}
          </p>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            {college.description.slice(0, 200)}...
            <a href="#about" className="text-blue-600 hover:underline ml-1">
              Read More
            </a>
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-6">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
            >
              <Heart size={28} fill={liked ? "red" : "none"} />
              {liked ? "Liked" : "Like"}
            </button>
            <a
              href={college.websiteUrl}
              target="_blank"
              className="btn btn-primary"
            >
              Visit College site
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center border-t border-gray-200 bg-gray-50 py-4 px-2 text-sm md:text-base">
          {[
            { id: "overview", label: "Overview", icon: Landmark },
            { id: "about", label: "About", icon: BookUser },
            { id: "facilities", label: "Facilities", icon: School },
            { id: "courses", label: "Courses", icon: Notebook },
            { id: "admission", label: "Admission", icon: BedSingle },
            { id: "placement", label: "Placement", icon: Wallet },
            { id: "recruitment", label: "Recruiters", icon: Building2 },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="mx-3 my-1 flex items-center text-gray-600 hover:text-blue-600 transition"
            >
              <item.icon size={18} className="mr-1" />
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Content Sections */}

      {/* Overview */}
      <Section id="overview" title="College Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base md:text-lg text-gray-800">
          <Detail icon={BookOpen} label="College Type" value={college.type} />
          <Detail
            icon={Users}
            label="Total Students"
            value={college.noOfStudents?.toLocaleString()}
          />
          <Detail
            icon={User}
            label="Total Faculties"
            value={college.noOfFaculties?.toLocaleString()}
          />
          <Detail
            icon={Globe}
            label="Affiliated To"
            value={college.affiliation}
          />
          <Detail
            icon={Star}
            label="NIRF Ranking (Engineering)"
            value={
              college.nirfRanking
                ? `#${college.nirfRanking}`
                : "Not Ranked"
            }
          />
        </div>
      </Section>

      {/* About */}
      <Section id="about" title={`About ${college.name}`}>
        <img
          src={college.imageUrl}
          alt={college.name}
          className="mb-3 rounded-lg shadow md:w-5/6 mx-auto"
        />
        <p className="text-gray-700 leading-relaxed md:text-lg max-w-4xl mx-auto text-justify">
          {college.description}
        </p>
      </Section>

      {/* facilities */}
      <Section id="facilities" title="Facilities">
        <ul className="list-disc pl-6 max-w-4xl text-center text-gray-700 space-y-2 md:text-lg mb-4">
          {/* {college.facilities.map((facility, i) => <li key={i}>{facility}</li>)} */}
          {college.facilities}
        </ul>
        <img
          src="https://avit.ac.in/wp-content/uploads/2024/11/facilities-img.webp"
          alt={college.name}
          className="mb-3 rounded-lg shadow md:w-5/6 mx-auto"
        />
      </Section>

      {/* popular courses */}
      <Section id="courses" title="Popular Courses">
        <p className="text-gray-700 md:text-lg flex items-center justify-center gap-2 max-w-4xl mx-auto">
          <BookOpen size={24} />
          <span className="font-semibold">Technical:</span> {college.courses}
        </p>
      </Section>

      {/* admission process */}
      <Section id="admission" title="Admission Process">
        <div className="text-gray-700 max-w-4xl mx-auto leading-relaxed space-y-2 text-left">
          {college.admissionProcess
            .split(".")
            .filter((sentence) => sentence.trim().length > 0)
            .map((sentence, index) => (
              <p key={index}>{sentence.trim()}.</p>
            ))}
        </div>
      </Section>

      {/* fee structure */}
      <Section id="admission" title="Fees Structure">
        <p className="text-gray-700 text-sm mb-4 italic">
          * Fees are indicative and may vary. Annual academic and hostel charges
          for all categories are listed below.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base text-left border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border-b border-gray-200">Particulars</th>
                <th className="p-3 border-b border-gray-200">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Academic Fee</td>
                <td className="p-3 font-medium text-gray-800">
                  ₹{college.fees.toLocaleString()}
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Hostel + Mess Fee</td>
                <td className="p-3 font-medium text-gray-800">
                  ₹{college.hostelFees.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Total Estimated Fee</td>
                <td className="p-3 font-semibold text-blue-700">
                  ₹{college.otherFees.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* placement stats */}
      <Section id="placement" title="Placement Stats">
        <Table
          head={["Course", "Average Package", "Median Package"]}
          rows={[
            [college.courses, college.averagePlacement, college.medianSalary],
          ]}
        />
      </Section>

      {/* past recruiters */}
      <Section id="recruitment" title="Past Recruitments">
        <img
          src={college.pastRecruitor}
          alt="Past Recruiters"
          className="rounded-md shadow max-w-4/5 mx-auto"
        />
      </Section>

      <div className="w-full text-center py-12">
        <Link
          href="/colleges"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition"
        >
          View More Colleges
        </Link>
      </div>
    </div>
  );
};

const Section = ({ id, title, children }) => (
  <section
    id={id}
    className="w-full py-14 px-4 md:px-8 bg-white border-t border-gray-200"
  >
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

const Detail = ({ icon: Icon, label, value }) => (
  <p className="flex items-center gap-3">
    <Icon size={22} className="text-blue-600" />
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

const Table = ({ head = [], rows }) => (
  <div className="overflow-x-auto max-w-4xl mx-auto">
    <table className="w-full border-collapse border text-left mt-4 text-sm md:text-base">
      {head.length > 0 && (
        <thead className="bg-gray-100 border-b">
          <tr>
            {head.map((item, idx) => (
              <th key={idx} className="p-3 font-medium border">
                {item}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="even:bg-gray-50">
            {row.map((cell, j) => (
              <td key={j} className="p-3 border">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SingleCollegeCard;
