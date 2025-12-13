// app/(route)/(viewable)/about/page.js
import { Github, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Learn more about College Finder.",
};

export default function AboutUs() {
  return (
    <div className="h-auto md:min-h-screen bg-[var(--background] md:py-12 py-4">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
        {/* Page Title */}
        <h1 className="md:text-4xl text-2xl font-bold text-center text-gray-900 dark:text-white md:mb-8 mb-4">
          About College Finder
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
          College Finder is your go-to platform for discovering top colleges and
          exams across various fields. We help students make informed decisions
          about their academic future with accurate and up-to-date information.
        </p>

        {/* Contact Section */}
        <div className="mb-8 w-full flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
            Contact Us
          </h2>
          <p className="text-center">
            If you have any questions or feedback, please do not hesitate to
            reach out to us.
          </p>
          <Link href="/contact-us">
            <p className="text-blue-500 underline">Contact Us</p>
          </Link>
        </div>

        {/* Developer Section */}
        <div className="bg-[var(--border] shadow-md rounded-xl p-8 text-center w-80 md:w-1/2 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white underline mb-4">
            Meet the Developer
          </h2>
          <Image
            src="/profile.jpg"
            alt="Nilesh Kumar"
            width={100}
            height={100}
            className="mx-auto rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Nilesh Kumar
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            This project is developed by <strong>Nilesh Kumar</strong>, a
            passionate NextJS full stack developer dedicated to building modern,
            high-performance web applications.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-4">
            <Link
              href="https://www.instagram.com/nileshnayan_/"
              target="_blank"
            >
              <Instagram
                className="text-gray-900 dark:text-white hover:text-blue-500 transition"
                size={28}
              />
            </Link>
            <Link href="https://github.com/nileshkumaryadav1" target="_blank">
              <Github
                className="text-gray-900 dark:text-white hover:text-blue-500 transition"
                size={28}
              />
            </Link>
            <Link href="https://linkedin.com/in/nileshkumar123" target="_blank">
              <Linkedin
                className="text-gray-900 dark:text-white hover:text-blue-500 transition"
                size={28}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
