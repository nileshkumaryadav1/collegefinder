"use client";

import Link from "next/link";
import React from "react";

function FnQ() {
  return (
    <section className="text-center py-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <h2 className="text-4xl font-bold text-black dark:text-gray-200 text-center mb-6">
        Why Choose Us?
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
        Our platform helps students discover the best colleges, understand
        entrance exams, and make informed decisions for their future.
      </p>
      <h2 className="text-4xl font-bold mt-6 text-black dark:text-white">
        Ready to Explore?
      </h2>
      <Link href="/colleges">
        <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition">
          Get Started
        </button>
      </Link>
    </section>
  );
}

export default FnQ;
