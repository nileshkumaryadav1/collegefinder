"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "What is the eligibility criteria for engineering colleges in India?",
    answer:
      "Most engineering colleges require candidates to have completed 10+2 with Physics, Chemistry, and Mathematics. Admission is usually based on entrance exams like JEE Main, JEE Advanced, or state-level exams.",
  },
  {
    question: "What are the top entrance exams for engineering?",
    answer:
      "The top entrance exams include JEE Main, JEE Advanced, BITSAT, VITEEE, SRMJEEE, and state-level exams like MHT-CET, KCET, and WBJEE.",
  },
  {
    question: "What is the difference between IITs, NITs, IIITs, and private colleges?",
    answer:
      "IITs (Indian Institutes of Technology) and NITs (National Institutes of Technology) are premier government institutions. IIITs focus more on IT and CS. Private colleges vary in quality and fees.",
  },
  {
    question: "What is the placement scenario in engineering colleges?",
    answer:
      "Placements vary by college. Top colleges have strong placement records with top companies visiting for recruitment. It's essential to check a college’s recent placement stats before applying.",
  },
  {
    question: "Are hostel and campus facilities good in engineering colleges?",
    answer:
      "Most reputed colleges offer decent hostel and campus facilities. However, quality can vary significantly between government and private institutions.",
  },
  {
    question: "What are the best branches in engineering for job opportunities?",
    answer:
      "Computer Science, Information Technology, Electronics & Communication, Mechanical, and Electrical are considered top branches in terms of job opportunities.",
  },
  {
    question: "What is the average fee structure for engineering courses?",
    answer:
      "Fees can range from ₹20,000 per year in government colleges to over ₹2–3 lakhs per year in private institutions, depending on the reputation and facilities.",
  },
  {
    question: "Can I change my branch after getting admission?",
    answer:
      "Yes, many colleges allow branch changes after the first year based on academic performance, subject to availability of seats.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">FAQs about Engineering Colleges</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-medium text-gray-800"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="px-4 py-3 text-gray-700 bg-white border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
