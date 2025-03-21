"use client";
import { Mail, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="h-auto md:h-150 bg-gray-100 dark:bg-gray-900 md:py-12 py-4">
      <div className="max-w-5xl mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          About College Finder
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-10">
          College Finder is your go-to platform for discovering top colleges and exams
          across various fields. We help students make informed decisions 
          about their academic future with accurate and up-to-date information.
        </p>

        {/* Developer Section */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 text-center">
          <Image
            src="/profile.jpg"
            alt="Nilesh Kumar"
            width={100}
            height={100}
            className="mx-auto rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Meet the Developer
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            This project is developed by <strong>Nilesh Kumar</strong>, 
            a passionate NextJS full stack developer dedicated to building 
            modern, high-performance web applications.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-4">
            <Link href="mailto:nileshkumarextra@gmail.com" target="_blank">
              <Mail className="text-gray-900 dark:text-white hover:text-blue-500 transition" size={28} />
            </Link>
            <Link href="https://github.com/nileshkumaryadav1" target="_blank">
              <Github className="text-gray-900 dark:text-white hover:text-blue-500 transition" size={28} />
            </Link>
            <Link href="https://linkedin.com/in/nileshkumar123" target="_blank">
              <Linkedin className="text-gray-900 dark:text-white hover:text-blue-500 transition" size={28} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
