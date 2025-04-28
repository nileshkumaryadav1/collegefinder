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
  School,
  Building,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import Link from "next/link";
import CollegeCardForHome from "./CollegeCardForHome";
import ExamCardSmall from "./ExamCardSmall";
import FAQs from "./FaQs";
import ReviewRating from "./ReviewRating";
// import SmallCardOfInsights from "./SmallCardOfInsights";
import Cutoff from "../singleCollege/Cutoff";
import Placement from "../singleCollege/Placement";
import FeeStructure from "../singleCollege/FeeStructure";
import Image from "next/image";

const SingleCollegeCard = ({ college }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header Section */}
      <div className="w-full bg-white border rounded-lg shadow-md overflow-hidden">
        <div className="relative w-full h-64 md:h-96">
          <img
            src={college.imageUrl}
            alt="College Image"
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
        <div className="pt-16 pb-8 px-4 md:px-8 text-center">
          <h1 className="text-xl md:text-4xl font-bold">{college.name}</h1>
          <p className="text-gray-600 mt-2 flex justify-center items-center gap-2">
            <MapPin size={18} />
            {college.slug}, {college.location}
          </p>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-justify">
            {college.description
              ? college.description.slice(0, 200)
              : "Description not available."}
            ...
            <a href="#about" className="text-blue-600 hover:underline ml-1">
              read more
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
              college.nirfRanking ? `#${college.nirfRanking}` : "Not Ranked"
            }
          />
        </div>
      </Section>

      {/* About */}
      <Section id="about" title={`About ${college.name}`}>
        <img
          src={college.imageUrl}
          alt="College Image"
          className="mb-3 rounded-lg shadow md:w-5/6 mx-auto"
        />
        <p className="text-gray-700 leading-relaxed md:text-lg max-w-5xl mx-auto text-justify">
          {college.description}
        </p>
      </Section>

      {/* address and traveling options */}
      <Section id="address" title="Address and Reaching Options">
        <div className="grid grid-cols-1 gap-3 text-base md:text-lg text-gray-800 mx-auto max-w-4xl">
          <Detail
            icon={MapPin}
            label="Address"
            value={`${college.slug}, ${college.location}`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Detail icon={Phone} label="Phone" value={college.phone} />
            <Detail icon={Mail} label="Email" value={college.email} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-6">
          <p>Travel Options:</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              college.location
            )}`}
            target="_blank"
            className="btn btn-primary"
            rel="noopener noreferrer"
            title="Open in Google Maps"
            aria-label="Open in Google Maps"
          >
            Open in Google Maps
          </a>
        </div>
      </Section>

      {/* promotion */}
      <Section id="promotion" title="">
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
      </Section>

      {/* popular courses */}
      <Section id="courses" title="Popular Courses">
        <p className="text-gray-700 md:text-lg flex items-left justify-center gap-2 max-w-4xl mx-auto">
          <div className="flex items-center">
            <BookOpen size={24} />
            <span className="font-semibold">Technical:</span>
          </div>

          {college.courses}
          {/* <ul>
            {college.courses.split(",").map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
          </ul> */}
        </p>
        {/* <Table
          head={["Technical", "Research"]}
          rows={[
            [
              <ul key="courses-list">
                {college.courses.split(",").map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>,
              null, // or <div key="empty-cell" /> to avoid warning
            ],
          ]}
        /> */}
      </Section>

      {/* admission process */}
      <Section id="admission" title="Admission Process">
        <div className="text-gray-700 max-w-4xl mx-auto leading-relaxed text-left">
          {college.admissionProcess
            ? college.admissionProcess
                .split(".")
                .filter((sentence) => sentence.trim().length > 0)
                .map((sentence, index) => (
                  <p key={index} className="mb-3 text-gray-800 text-justify">
                    🌟{sentence.trim()}.
                  </p>
                ))
            : "Admission process information not available."}
        </div>
      </Section>

      {/* facilities */}
      <Section id="facilities" title="Facilities">
        <ul className="list-disc pl-6 max-w-4xl text-center text-gray-700 space-y-2 md:text-lg">
          {/* {college.facilities.map((facility, i) => <li key={i}>{facility}</li>)} */}
          {/* {college.facilities} */}
          {/* <ul>
            {college.facilities.split(",").map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
          </ul> */}
        </ul>
        <Table
          head={["Campus Facilities"]}
          rows={[
            [
              <ul key="facilities-list">
                {college.facilities?.split(",").map((item, i) => (
                  <li key={i}>{item.trim()}</li>
                ))}
              </ul>,
            ],
          ]}
        />
        <Image
          src="https://avit.ac.in/wp-content/uploads/2024/11/facilities-img.webp"
          alt="College Facilities Image"
          width={800}
          height={600}
          className="mt-6 rounded-lg shadow md:w-7/9 mx-auto"
        />
      </Section>

      {/* virtual tour */}
      {college.virtualTourLink && (
        <Section id="virtualTour" title="🎥 Virtual Tour">
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
        </Section>
      )}

      {/* fee structure */}
      <FeeStructure college={college} />

      {/* fee waiver */}
      <Section id="feeWaiver" title="Fee Waiver">
        <p className="text-gray-700 md:text-lg gap-2 max-w-4xl mx-auto">
          {college.feeWaiver
            ? college.feeWaiver
                .split(".")
                .filter((sentence) => sentence.trim().length > 0)
                .map((sentence, index) => (
                  <p key={index} className="mb-3 text-gray-800 text-justify">
                    🌟{sentence.trim()}.
                  </p>
                ))
            : "Fee waiver information not available."}
        </p>
      </Section>

      {/* Cutoff section */}
      <Cutoff college={college} />

      {/* placement stats */}
      <Placement college={college} />

      {/* Advertisement & Promotions */}
      <h2 className="text-2xl font-semibold text-gray-800 bg-white text-center hidden">
        Advertisement
      </h2>
      <div className="flex flex-col md:flex-row justify-around gap-4 p-5 bg-white">
        <div className="bg-white border rounded-xl shadow p-4 mb-6 hidden">
          <h4 className="text-md font-bold text-gray-800 mb-2">Promotions</h4>
          <ul className="text-sm text-blue-700 list-disc list-inside space-y-2">
            <li>
              <Link href="/colleges" className="hover:underline">
                Top Engineering Colleges in India 2025
              </Link>
            </li>
            <li>
              <Link href="/exams" className="hover:underline">
                How to Crack JEE Advanced 2026 Strategy Guide
              </Link>
            </li>
            <li>
              <Link href="/sponsors" className="hover:underline">
                Free Counseling by Experts
              </Link>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl md:w-1/2 shadow p-4">
          <h4 className="text-md font-bold text-blue-700 mb-2 text-center">
            Advertisement
          </h4>
          <Link href="/sponsors" className="hover:underline">
            <Image
              src="/sponsors.jpg"
              alt="Advertisement Image"
              width={800}
              height={600}
              className="rounded-lg w-full h-auto object-cover"
            />
          </Link>
          <p className="text-xs text-gray-500 mt-2">Sponsored Content</p>
        </div>
      </div>

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
      <section className="w-full py-14 px-4 md:px-8 bg-white border-t border-gray-200 hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Important Insights
          </h2>

          <Link href="/news" className="btn btn-link">
            View Updates
          </Link>
          <div className="max-w-5xl mx-auto">
            {/* <SmallCardOfInsights /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable components
const Section = ({ id, title, children }) => (
  <section
    id={id}
    className="w-full py-14 px-4 md:px-8 bg-white border-t border-gray-200"
  >
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 md:mb-8 mb-5 hover:underline decoration-sky-500/30 hover:decoration-sky-500 text-gray-800 dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

const Detail = ({ icon: Icon, label, value }) => (
  <p className="flex gap-2">
    <Icon size={22} className="text-blue-600" />
    <span className="font-semibold">{label}:</span>
    <p className="text-left">{value}</p>
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
