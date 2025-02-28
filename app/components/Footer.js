import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h4 className="text-xl font-semibold text-white">College Finder</h4>
            <p className="mt-2 text-gray-400">Find the best colleges and exams for your future.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-white">Quick Links</h5>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/colleges" className="hover:text-blue-400 transition">
                  Colleges
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-blue-400 transition">
                  Exams
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h5 className="text-lg font-semibold text-white">Follow Us</h5>
            <div className="mt-3 flex space-x-4">
              <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-blue-400 transition text-2xl">
                <FaTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-blue-400 transition text-2xl">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-blue-400 transition text-2xl">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} College Finder. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
