"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  BookUser,
  Notebook,
  BedSingle,
  Wallet,
  Landmark,
  School,
} from "lucide-react";
import Link from "next/link";
import ExamCardSmall from "./ExamCardSmall";
import SmallCardOfInsights from "./SmallCardOfInsights";
import FAQs from "./FaQs";
import ReviewRating from "./ReviewRating";
import CollegeCardForHome from "./CollegeCardForHome";
import HeroSnapshot from "../college/HeroSnapshot";
import AboutSnapshot from "../college/AboutSnapshot";
import BasicSnapshot from "../college/BasicSnapshot";
import GallerySnapshot from "../college/GallerySnapshot";
import InstitutionalSnapshot from "../college/InstitutionalSnapshot";
import AcademicsSnapshot from "../college/AcademicsSnapshot";
import FeesSnapshot from "../college/FeesSnapshot";
import FacilitiesSnapshot from "../college/FacilitiesSnapshot";
import PlacementsSnapshot from "../college/PlacementsSnapshot";
import RankingsSnapshot from "../college/RankingsSnapshot";
import ContactSnapshot from "../college/ContactSnapshot";

function Row({ label, value }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex gap-4 py-1">
      <div className="w-40 text-sm">{label}</div>
      <div className="text-sm break-words text-[var(--secondary)]">{value}</div>
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

  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8 rounded-lg shadow-md">
      {/* Header */}
      <HeroSnapshot
        college={college}
        openSections={openSections}
        toggle={toggle}
      />

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center border-gray-200 bg-[var(--background)] py-4 px-2 text-sm md:text-base">
        {[
          { id: "basic-info", label: "Overview", icon: Landmark },
          { id: "about", label: "About", icon: BookUser },
          { id: "courses", label: "Courses", icon: Notebook },
          { id: "academics", label: "Admission", icon: BedSingle },
          { id: "fees-scholarships", label: "Fees", icon: Wallet },
          { id: "facilities", label: "Facilities", icon: School },
          { id: "cut-offs", label: "Cutoff", icon: Wallet },
          { id: "placements", label: "Placement", icon: Wallet },
          { id: "reviews", label: "Reviews", icon: Star },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="mx-3 my-2.5 flex items-center text-[var(--secondary)] hover:text-[var(--highlight)] transition md:hover:translate-y-1"
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
        <AboutSnapshot
          college={college}
          openSections={openSections}
          toggle={toggle}
        />

        {/* Gallery */}
        <GallerySnapshot college={college} />

        {/* Basic Info */}
        <BasicSnapshot
          college={college}
          openSections={openSections}
          toggle={toggle}
        />

        {/* Institutional Details */}
        <InstitutionalSnapshot
          college={college}
          openSections={openSections}
          toggle={toggle}
        />

        {/* promotion */}
        <section id="promotion" title="">
          <div className="bg-[var(--background)] text-[var(--foreground)] mx-auto leading-relaxed space-y-2 text-left">
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
        <AcademicsSnapshot
          college={college}
          openSections={openSections}
          toggle={toggle}
        />

        {/* Fees & Scholarships */}
        <FeesSnapshot
          college={college}
          openSections={openSections}
          toggle={toggle}
        />

        {/* Facilities */}
        <FacilitiesSnapshot college={college} />

        {/* Placements */}
        <PlacementsSnapshot college={college} />

        {/* Rankings */}
        <RankingsSnapshot college={college} />

        {/* Contact & Social */}
        <ContactSnapshot college={college} />

        {/* Analytics, SEO, Metadata */}
        {/* <AnalyticsSnapshot college={college} /> */}
      </div>

      <div className="max-w-6xl mx-auto mt-8 mb-12 text-sm text-gray-500">
        Tip: you can toggle sections to improve readability.
      </div>

      {/* Advertisement & Promotions */}
      <section className="bg-[var(--background)] text-[var(--foreground)] flex justify-center mb-4">
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
        className="w-full py-14 px-4 md:px-8 bg-[var(--background)] text-[var(--foreground)] border-t border-gray-200"
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
        className="w-full py-6 px-4 md:px-8 bg-[var(--background)] text-[var(--foreground)] border-t border-gray-200"
      >
        <div className="max-w-6xl mx-auto text-center">
          <FAQs data={college.faq} />
          <div className="max-w-4xl mx-auto"></div>
        </div>
      </section>

      {/* similar colleges */}
      <section className="w-full py-14 px-4 md:px-8 bg-[var(--background)] text-[var(--foreground)] border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--highlight)]">
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
      <section className="w-full py-14 px-4 md:px-8 bg-[var(--background)] text-[var(--foreground)] border-t border-gray-200 hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--highlight)] mb-8">
            Similar Courses
          </h2>
          <div className="max-w-4xl mx-auto">
            {/* <SimilarCourses data={college.similarCourses} /> */}
            <h2>Similar courses are not available for this college.</h2>
          </div>
        </div>
      </section>

      {/* similar exam section */}
      <section className="w-full py-14 px-4 md:px-8 bg-[var(--background)] text-[var(--foreground)] border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--highlight)]">
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

      {/* important Updates */}
      <section className="w-full py-14 px-4 md:px-8 bg-[var(--background)] text-[var(--foreground)] border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--highlight)]">
            Important Updates
          </h2>
          <Link href="/news" className="btn btn-link mt-4">
            View Updates
          </Link>
          <div className="max-w-5xl mx-auto my-2">
            <SmallCardOfInsights />
          </div>
        </div>
      </section>
    </section>
  );
}
