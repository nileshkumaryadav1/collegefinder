"use client";

import { motion } from "framer-motion";

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "College Finder helped me compare IITs, track JEE updates, and even find a scholarship I did not know existed!",
      name: "Nilesh Kumar",
      detail: "B.Tech Student",
    },
    {
      quote:
        "I was skeptical about IITs, but College Finder made the process simple and easy to understand.",
      name: "Rahul Kumar",
      detail: "B.Tech Student",
    },
    {
      quote:
        "IITB was my dream college, but College Finder made it a reality. It was a game-changer!",
      name: "Rohit Kumar",
      detail: "B.Tech Student",
    },
    {
      quote:
        "College Finder is a game-changer! It helped me find the perfect college for my dream career.",
      name: "Rajesh Kumar",
      detail: "B.Tech Student",
    },
    {
      quote:
        "College Finder gave me clarity on which college was best for my branch. Loved it!",
      name: "Anjali Sharma",
      detail: "B.Tech Student",
    },
  ];

  const repeatedTestimonials = [...testimonials, ...testimonials]; // duplicate for smooth loop

  return (
    <section className="bg-blue-50 dark:bg-gray-900 py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center underline decoration-sky-500/30 hover:decoration-sky-500 text-gray-800 dark:text-white transition-all duration-300">
          What Students Say
        </h2>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {repeatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[300px] max-w-[300px] bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
              >
                <p className="italic text-gray-700 dark:text-gray-300 text-sm mb-3 text-center">
                  “{testimonial.quote}”
                </p>
                <p className="text-sm text-blue-900 dark:text-white font-semibold text-center">
                  {testimonial.name} <span className="font-normal">— {testimonial.detail}</span>
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
