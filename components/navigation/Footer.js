import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-8 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-start md:flex-row flex-col gap-2">
          {/* Brand Info */}
          <div className="md:max-w-2/4">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              College Finder
            </h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400 md:w-6/7">
              College Finder is our go-to platform for discovering top colleges,
              exams, syllabus & scholarships across various fields. We help
              students make informed decisions about their academic future with
              accurate and up-to-date information.
            </p>
          </div>

          <div className="flex md:flex-row gap-8 w-full md:w-auto justify-around">
            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold text-black dark:text-white">
                Quick Links
              </h5>
              <ul className="mt-2 space-y-1">
                {[
                  { href: "/", label: "Home" },
                  { href: "/colleges", label: "Colleges" },
                  { href: "/exams", label: "Exams" },
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

            {/* External Links */}
            <div>
              <h5 className="text-lg font-semibold text-black dark:text-white">
                Important Links
              </h5>
              <ul className="mt-2 space-y-1">
                <li>
                  <a
                    href="https://www.naukri.com/"
                    target="_blank"
                    className="hover:text-blue-500 dark:hover:text-blue-400 transition"
                  >
                    Naukri
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.timesjobs.com/"
                    target="_blank"
                    className="hover:text-blue-500 dark:hover:text-blue-400 transition"
                  >
                    TimesJobs
                  </a>
                </li>
              </ul>
            </div>

            {/* News */}
            <div>
              <h5 className="text-lg font-semibold text-black dark:text-white">
                News
              </h5>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link
                    href="/news"
                    className="hover:text-blue-500 dark:hover:text-blue-400 transition"
                  >
                    Latest News
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="md:mt-4 md:mt-0 w-full flex flex-col items-center md:items-end justify-end">
            <h5 className="text-lg font-semibold text-black dark:text-white">
              Follow Us
            </h5>
            <div className="mt-3 flex space-x-4">
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
            <img
              src="/logo.jpg"
              alt="College finder"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-sm text-black dark:text-white leading-tight">
              <p>College</p>
              <p>Finder</p>
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
