import { Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-8 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-center md:justify-between md:flex-row flex-col md:gap-10 gap-6">
          {/* combining for mobile style */}
          <div className="w-full max-w-6xl mx-auto md:px-4 space-y-6">
            {/* Explore Section - Full Width */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow-sm bg-white dark:bg-gray-900">
              <h4 className="text-lg font-bold text-gray-800 dark:text-white border-b pb-2 mb-3 text-center">
                Explore
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                {[
                  { href: "/find-colleges/iits", label: "Explore All IITs" },
                  { href: "/find-colleges/nits", label: "Explore All NITs" },
                  {
                    href: "/find-colleges/state-wise",
                    label: "State-wise Colleges",
                  },
                  {
                    href: "/find-exams/engineering-entrance",
                    label: "Engineering Entrance",
                  },
                  {
                    href: "/find-exams/medical-entrance",
                    label: "Medical Entrance",
                  },
                  {
                    href: "/find-scholarships/graduation",
                    label: "Graduation Scholarships",
                  },
                  {
                    href: "/find-scholarships/post-graduation",
                    label: "Masters Scholarships",
                  },
                  {
                    href: "/college-comparison",
                    label: "Compare Colleges",
                  },
                  {
                    href: "/college-predictor",
                    label: "College Predictor",
                  },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links + News */}
            <div className="flex flex-row gap-4">
              {/* Quick Links */}
              <div className="w-1/2">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow-sm bg-white dark:bg-gray-900 h-full">
                  <h5 className="text-lg font-bold text-gray-800 dark:text-white border-b pb-2 mb-3">
                    Quick Links
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {[
                      { href: "/exams", label: "Exams" },
                      { href: "/colleges", label: "Colleges" },
                      { href: "/scholarships", label: "Scholarships" },
                      { href: "/about", label: "About Us" },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* News */}
              <div className="w-1/2">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow-sm bg-white dark:bg-gray-900 h-full">
                  <h5 className="text-lg font-bold text-gray-800 dark:text-white border-b pb-2 mb-3">
                    Insights
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {[
                      { href: "/insights", label: "Latest Insights" },
                      {
                        href: "/find-news/colleges",
                        label: "Colleges Insights",
                      },
                      { href: "/find-news/exams", label: "Exams Insights" },
                      {
                        href: "/find-news/scholarships",
                        label: "Scholarships Insights",
                      },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Us + Social Media */}
        <div className="mt-8 flex flex-col md:flex-row justify-around max-w-5xl mx-auto">
          <div className="md:max-w-2/4">
            <h4 className="text-xl font-semibold text-black dark:text-white text-center">
              College Finder
            </h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-justify">
              College Finder is our go-to platform for discovering top colleges,
              exams, syllabus & scholarships across various fields. We help
              students make informed decisions about their academic future with
              accurate and up-to-date information.
            </p>
          </div>
          {/* Social Media */}
          <div className="flex flex-col justify-center md:justify-start items-center my-4">
            <h5 className="text-lg font-semibold text-black dark:text-white">
              Follow Us
            </h5>
            <div className="md:mt-3 mt-2 flex space-x-4">
              {[
                {
                  href: "/contact-us",
                  icon: <MessageCircle />,
                },
                {
                  href: "https://github.com/nileshkumaryadav1",
                  icon: <FaGithub />,
                },
                {
                  href: "https://linkedin.com/in/nileshkumar123",
                  icon: <FaLinkedin />,
                },
                {
                  href: "https://instagram.com/nileshnayan_",
                  icon: <FaInstagram />,
                },
              ].map(({ href, icon }, i) => (
                <Link
                  key={i}
                  href={href}
                  aria-label="Social Media Link"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition text-2xl"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center md:mt-8 mt-3 border-t border-gray-300 dark:border-gray-700 pt-4 flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <Image
                src="/logo.jpg"
                alt="College finder"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
            </Link>
            <div className="text-sm text-black dark:text-white leading-tight">
              <Link
                href="/"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                <p>College</p>
                <p>Finder</p>
              </Link>
            </div>
          </div>
          <p>
            <Link
              href="/terms"
              className="underline text-blue-600 hover:text-blue-800 text-xs"
            >
              Terms & Conditions
            </Link>{" "}
            |{" "}
            <Link
              href="/privacy"
              className="underline text-blue-600 hover:text-blue-800 text-xs"
            >
              Privacy Policy
            </Link>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} College Finder. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
