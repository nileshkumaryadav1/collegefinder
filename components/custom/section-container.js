import React from "react";
import Link from "next/link";
import AboutSnapshot from "../college/AboutSnapshot";
import AcademicsSnapshot from "../college/AcademicsSnapshot";
import FeesSnapshot from "../college/FeesSnapshot";
import PlacementsSnapshot from "../college/PlacementsSnapshot";
import FacilitiesSnapshot from "../college/FacilitiesSnapshot";
import InstitutionalSnapshot from "../college/InstitutionalSnapshot";
import BasicSnapshot from "../college/BasicSnapshot";
import ReviewRating from "./ReviewRating";
import GallerySnapshot from "../college/GallerySnapshot";
import RankingsSnapshot from "../college/RankingsSnapshot";
import ContactSnapshot from "../college/ContactSnapshot";

function SectionContainer() {
  return (
    <div>
      <div className="max-w-6xl mx-auto mt-6 space-y-6">
        {/* About */}
        <AboutSnapshot
          college={college}
          openSections={openSections}
          toggle={toggle}
        />

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

        {/* Placements */}
        <PlacementsSnapshot college={college} />

        {/* Facilities */}
        <FacilitiesSnapshot college={college} />

        <ReviewRating collegeId={college._id} />

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

        {/* <ReviewRating collegeId={college._id} /> */}

        {/* Rankings */}
        <RankingsSnapshot college={college} />

        {/* Contact & Social */}
        <ContactSnapshot college={college} />

        {/* Analytics, SEO, Metadata */}
        {/* <AnalyticsSnapshot college={college} /> */}
      </div>
    </div>
  );
}

export default SectionContainer;
