"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Menu, X, Building2, PenBox, Database } from "lucide-react";
import Image from "next/image";
import { FaMoneyBill } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 py-3 shadow-md z-50">
      <div className="flex justify-between items-center mx-auto md:px-20 px-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-black text-blue-500 leading-snug font-manrope font-extrabold flex items-center"
        >
          <Image
            src="/favicon.ico"
            alt=""
            width={40}
            height={40}
            className="mr-2 rounded-full"
          />
          <p className="text-gray-200 text-xl mr-1 font-bold">CollegeFinder</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-1">
          <NavItem
            href="/"
            label="Home"
            active={pathname === "/"}
          />
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
            href="/about"
            label="About"
            active={pathname === "/about"}
          />
          <NavItem
            href="/user/dashboard"
            icon={<User size={24} />}
            label="Dashboard"
            active={pathname === "/user/dashboard" || pathname === "/user/login" || pathname === "/user/register"}
          />
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Hamburger Mobile Menu (Slide-in) */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 sm:hidden`}
      >
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-black text-blue-500 leading-snug font-manrope font-extrabold flex items-center"
          >
            <p className="text-gray-200 text-xl font-bold">
              CollegeFinder
            </p>
          </Link>

          {/* Close Button */}
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col px-6">
          <NavItemMobile
            href="/"
            icon={<Home size={24} />}
            label="Home"
            active={pathname === "/"}
          />
          <NavItemMobile
            href="/colleges"
            icon={<Building2 size={24} />}
            label="Colleges"
            active={pathname === "/colleges"}
          />
          <NavItemMobile
            href="/exams"
            icon={<PenBox size={24} />}
            label="Exams"
            active={pathname === "/exams"}
          />
          <NavItemMobile
            href="/scholarships"
            icon={<FaMoneyBill size={24} />}
            label="Scholarships"
            active={pathname === "/scholarships"}
          />
          <NavItemMobile
            href="/about"
            icon = {<Database size={24} />}
            label="About"
            active={pathname === "/about"}
          />
          <NavItemMobile
            href="/user/dashboard"
            icon={<User size={24} />}
            label="Dashboard"
            active={pathname === "/user/dashboard" || pathname === "/user/login" || pathname === "/user/register"}
          />
        </div>
      </div>
    </nav>
  );
};

// Desktop NavItem
const NavItem = ({ href, icon, label, active }) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        active ? "text-blue-400 bg-gray-800" : "text-gray-400 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

// Mobile NavItem
const NavItemMobile = ({ href, icon, label, active }) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 p-3 text-lg rounded-lg ${
        active ? "text-blue-400 bg-gray-700" : "text-gray-300 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;
