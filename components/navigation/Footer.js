import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-8 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-center md:justify-between md:flex-row flex-col md:gap-10 gap-6">
          {/* Brand Info */}
          <div className="md:max-w-1/4">
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

          {/* combining for mobile style */}
          <div className="flex flex-row md:gap-15">
            {/* sorting links */}
            <div className="">
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Explore
              </h4>
              <ul className="md:mt-2 space-y-1">
                {[
                  { href: "/colleges/iits", label: "IIT Colleges" },
                  { href: "/colleges/nits", label: "NIT Colleges" },
                  {
                    href: "/exams/engineering-entrance",
                    label: "Engineering Entrance",
                  },
                  {
                    href: "/exams/medical-entrance",
                    label: "Medical Entrance",
                  },
                  {
                    href: "/scholarships/graduation",
                    label: "Graduation Scholarships",
                  },
                  {
                    href: "/scholarships/post-graduation",
                    label: "Masters Scholarships",
                  },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition"
                    >
                      <p className={``}>{label}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex md:flex-row md:gap-8 w-full md:w-auto justify-around">
              <div>
                <h5 className="text-lg font-semibold text-black dark:text-white">
                  Quick Links
                </h5>
                <ul className="md:mt-2 space-y-1">
                  {[
                    { href: "/exams", label: "Exams" },
                    { href: "/colleges", label: "Colleges" },
                    { href: "/scholarships", label: "Scholarships" },
                    { href: "/about", label: "About Us" },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* News */}
            <div className="">
              <h5 className="text-lg font-semibold text-black dark:text-white">
                News
              </h5>
              <ul className="md:mt-2 space-y-1">
                {[
                  { href: "/news", label: "Latest News" },
                  { href: "/news/colleges", label: "Colleges News" },
                  { href: "/news/exams", label: "Exams News" },
                  { href: "/news/scholarships", label: "Scholarships News" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
            <h5 className="text-lg font-semibold text-black dark:text-white">
              Follow Us
            </h5>
            <div className="md:mt-3 mt-2 flex space-x-4">
              {[
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
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition text-2xl"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center md:mt-8 mt-3 border-t border-gray-300 dark:border-gray-700 pt-4 space-y-5 flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img
                src="/logo.jpg"
                alt="College finder"
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
