import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-start md:flex-row flex-col gap-8">
          {/* Brand Info */}
          <div className=" max-w-2/4">
            <h4 className="text-xl font-semibold text-white">College Finder</h4>
            <p className="mt-2 text-gray-400">
              College Finder is our go-to platform for discovering top colleges,
              exams, syllabus & scholarships across various fields. We help
              students make informed decisions about their academic future with
              accurate and up-to-date information.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-white">Quick Links</h5>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/colleges"
                  className="hover:text-blue-400 transition"
                >
                  Colleges
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-blue-400 transition">
                  Exams
                </Link>
              </li>
              <li>
                <Link
                  href="/scholarships"
                  className="hover:text-blue-400 transition"
                >
                  scholarships
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Some Links to official sites */}
          <div>
            <h5 className="text-lg font-semibold text-white">
              Important Links
            </h5>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="https://www.naukri.com/"
                  target="_blank"
                  className="hover:text-blue-400 transition"
                >
                  Naukri
                </a>
              </li>
              <li>
                <a
                  href="https://www.timesjobs.com/"
                  target="_blank"
                  className="hover:text-blue-400 transition"
                >
                  TimesJobs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h5 className="text-lg font-semibold text-white">Follow Us</h5>
            <div className="mt-3 flex space-x-4">
              <a
                href="https://github.com/nileshkumaryadav1"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition text-2xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/nileshkumar123"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com/nileshnayan_"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 border-t border-gray-700 pt-4 space-y-5">
          <div>
            <img
              src="/logo.jpg"
              alt="College finder"
              className="w-12 h-12 rounded-full mx-auto"
            />
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} College Finder. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
