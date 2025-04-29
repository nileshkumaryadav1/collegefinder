"use client";

import { useState } from "react";
import SearchModal from "./SearchModal";

export default function HomeHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="relative overflow-hidden md:py-20 py-16 px-4 text-center"
      aria-label="Hero Section"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-gradient-to-br from-blue-600 via-gray-700 to-black bg-center dark:opacity-20 blur-xs"
        // style={{
        //   backgroundImage:
        //     "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=3000&q=60')",
        // }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-5xl font-extrabold text-white dark:text-gray-100 leading-tight md:mb-6 mb-4">
          Discover Top Colleges, Exams, Scholarships & More
        </h1>
        <p className="text-lg md:text-xl text-white/90 dark:text-gray-300 md:mb-8 mb-6">
          Explore the latest and most accurate information to plan your academic
          future.
        </p>

        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full px-6 md:py-4 py-3 rounded-lg bg-white/90 dark:bg-gray-800 text-black dark:text-white md:font-semibold border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all"
            aria-label="Open Search Modal"
          >
            <p className="md:text-lg text-xs">
              Search Colleges, Exams & Scholarships...
            </p>
          </button>

          <SearchModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </section>
  );
}
