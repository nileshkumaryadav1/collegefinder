import React, { useState } from "react";
import SearchModal from "./SearchModal";

function HomeHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section
      className="bg-blue-50 dark:bg-gray-900 md:py-16 py-12 px-4 text-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <h1 className="md:text-4xl text-3xl font-bold mb-4 text-white dark:text-gray-900">
        Discover Top Colleges, Exams, Scholarships & More
      </h1>
      <p className="max-w-xl mx-auto mb-6 text-white dark:text-gray-900">
        Explore the latest and most accurate info to plan your academic future.
      </p>
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          onClick={() => setIsModalOpen(true)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
          placeholder={"Search Colleges, Exams & Scholarships ...."}
        />

        <SearchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
}

export default HomeHero;
