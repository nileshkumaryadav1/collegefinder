import React, { useState } from "react";
import SearchModal from "./SearchModal";

function HomeHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section
      className="md:relative md:h-[50vh] h-[30vh] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="md:p-6 p-1 rounded-lg">
        <h1 className="text-2xl md:text-6xl text-white md:mb-4 [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)] text-sky-400 text-2xl leading-snug font-manrope font-extrabold">
          Find Your Dream College
        </h1>
        <p className="text-white [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)] text-sky-400 text-lg md:text-2xl leading-snug font-manrope md:font-bold">
          Explore top colleges & entrance exams all in one place.
        </p>
        <input
          type="text"
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 hover:text-black transition w-8/9 md:mt-6 mt-2"
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
