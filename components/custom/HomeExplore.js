"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCategories({ exploreData }) {
  return (
    <section className="md:py-12 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 underline decoration-sky-500/30 hover:decoration-sky-500">
          Start Exploring
        </h2>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {exploreData.map((i) => (
            <motion.div
              key={i.href}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer"
            >
              <Link href={i.href} className="block">
                <Image
                  src={i.link}
                  alt="College & Exam Images"
                  width={300}
                  height={300}
                  className="rounded-md mb-3 h-32 w-full object-cover"
                />
                <h3 className="text-lg font-medium">{i.label}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
