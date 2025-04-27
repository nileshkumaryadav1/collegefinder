"use client";

import { Plaster, Unbounded } from "next/font/google";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Menu,
  X,
  Building2,
  PenBox,
  Book,
  Newspaper,
} from "lucide-react";
import { FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";
// import ThemeToggle from "@/components/theme/ThemeBtn";

const unbounded = Unbounded({ weight: "400", subsets: ["latin"] });
const plaster = Plaster({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 border-b border-gray-200 py-2 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`max-w-8xl mx-auto px-4 md:px-20 py-1.5 h-full flex justify-between items-center  ${unbounded.className}`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/favicon.jpg"
              alt="CollegeFinder Logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-lg font-bold text-gray-800 tracking-tight">
              COLLEGE FINDER
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-2">
            <NavItem href="/" label="Home" active={pathname === "/"} />
            <NavItem
              href="/colleges"
              label="Colleges"
              active={pathname === "/colleges"}
            />
            <NavItem
              href="/exams"
              label="Exams"
              active={pathname === "/exams"}
            />
            <NavItem
              href="/scholarships"
              label="Scholarships"
              active={pathname === "/scholarships"}
            />
            <NavItem
              href="/insights"
              label="Insights"
              active={pathname === "/insights"}
            />
            <NavItem
              href="/about"
              label="About"
              active={pathname === "/about"}
            />
            <NavItem
              href="/user/dashboard"
              label="Profile"
              icon={<User size={18} />}
              active={pathname.startsWith("/user")}
            />
            {/* <ThemeToggle /> */}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-gray-800"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`fixed top-0 left-0 min-h-screen w-64 bg-white shadow-xl transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out sm:hidden z-50`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-lg font-bold text-gray-800"
            >
              CollegeFinder
            </Link>
            <button onClick={closeMenu} className="text-gray-800">
              <X size={26} />
            </button>
          </div>

          <div className="flex flex-col px-4 py-2 space-y-1">
            <NavItemMobile
              href="/"
              icon={<Home size={18} />}
              label="Home"
              active={pathname === "/"}
              onClick={closeMenu}
            />
            <NavItemMobile
              href="/colleges"
              icon={<Building2 size={18} />}
              label="Colleges"
              active={pathname === "/colleges"}
              onClick={closeMenu}
            />
            <NavItemMobile
              href="/exams"
              icon={<PenBox size={18} />}
              label="Exams"
              active={pathname === "/exams"}
              onClick={closeMenu}
            />
            <NavItemMobile
              href="/scholarships"
              icon={<FaMoneyBillWave size={18} />}
              label="Scholarships"
              active={pathname === "/scholarships"}
              onClick={closeMenu}
            />
            <NavItemMobile
              href="/insights"
              icon={<Newspaper size={18} />}
              label="Insights"
              active={pathname === "/insights"}
              onClick={closeMenu}
            />
            <NavItemMobile
              href="/about"
              icon={<Book size={18} />}
              label="About"
              active={pathname === "/about"}
              onClick={closeMenu}
            />
            <NavItemMobile
              href="/user/dashboard"
              icon={<User size={18} />}
              label="Profile"
              active={pathname.startsWith("/user")}
              onClick={closeMenu}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

const NavItem = ({ href, icon, label, active }) => (
  <Link
    href={href}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
      active
        ? "bg-blue-100 text-blue-700"
        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
    }`}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
  </Link>
);

const NavItemMobile = ({ href, icon, label, active, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 text-sm font-medium rounded-md ${
      active
        ? "bg-blue-100 text-blue-700"
        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
