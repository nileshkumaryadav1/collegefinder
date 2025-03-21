"use client";

import React from "react";
import Link from "next/link";

function HomeHero() {
  return (
    <section
      className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="p-6 rounded-lg">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)] text-sky-400 text-2xl md:text-2xl leading-snug font-manrope font-extrabold">
          Find Your Dream College
        </h1>
        <p className="text-lg text-white [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)] text-sky-400 text-xl md:text-2xl leading-snug font-manrope md:font-extrabold">
          Explore top colleges & entrance exams all in one place.
        </p>
        <Link href="/colleges">
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
            Explore Now
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HomeHero;
