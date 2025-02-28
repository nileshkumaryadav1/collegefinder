"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AboutUs from "./about/page";

export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
      setLoading(false);
    };

    fetchColleges();
  }, []);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
      setLoading(false);
    };
    
    fetchExams();
  }, []);

  // if (loading) return <p className="text-center mt-10">Loading colleges...</p>;
  // if (loading) return <p className="text-center mt-10">Loading exams...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Hero Section */}
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

      {/* 🔹 Featured Colleges */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Top Colleges</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example College Card */}
          {colleges.map((college) => (
            <div
              key={college._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{college.name}</h2>
                <p className="text-gray-600">{college.location}</p>
                <p className="text-gray-800 font-bold">
                  Ranking: #{college.ranking}
                </p>
                <Link
                  href={`/colleges/${college._id}`}
                  className="text-blue-500 mt-2 inline-block"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Popular Exams */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Popular Exams</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={
                    "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2019/12/exam-1575444923.jpg"
                  }
                  alt={exam.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{exam.name}</h2>
                  <p className="text-gray-600">{exam.date}</p>
                  <p className="text-gray-600">
                    Eligibility: {exam.eligibility.slice(0, 20) + "..."}
                  </p>
                  <p className="text-gray-600">
                    Syllabus: {exam.syllabus.slice(0, 20) + "..."}
                  </p>
                  <Link
                    href={`/exams/${exam._id}`}
                    className="text-blue-500 mt-2 inline-block"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 About Section */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us?</h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          Our platform helps students discover the best colleges, understand
          entrance exams, and make informed decisions for their future.
        </p>
      </section>

      {/* 🔹 Call to Action */}
      <section className="text-center py-12 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold">Ready to Explore?</h2>
        <Link href="/colleges">
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition">
            Get Started
          </button>
        </Link>
      </section>

      <AboutUs />
    </div>
  );
}
