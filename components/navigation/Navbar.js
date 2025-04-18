"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Menu, X, Building2, PenBox, Book } from "lucide-react";
import { FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 py-3 shadow-md z-50">
      <div className="flex justify-between items-center mx-auto md:px-20 px-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-blue-500 font-extrabold"
        >
          <Image
            src="/logo.jpg"
            alt="CollegeFinder Logo"
            width={42}
            height={42}
            className="rounded-full"
          />
          <span className="text-gray-200 text-xl font-bold">CollegeFinder</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-1">
          <NavItem href="/" label="Home" active={pathname === "/"} />
          <NavItem
            href="/colleges"
            label="Colleges"
            active={pathname === "/colleges"}
          />
          <NavItem href="/exams" label="Exams" active={pathname === "/exams"} />
          <NavItem
            href="/scholarships"
            label="Scholarships"
            active={pathname === "/scholarships"}
          />
          <NavItem href="/about" label="About" active={pathname === "/about"} />
          <NavItem
            href="/user/dashboard"
            icon={<User size={20} />}
            label="Profile"
            active={pathname.startsWith("/user")}
          />
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out sm:hidden z-50 backdrop-blur-md`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-gray-200 text-xl font-bold"
          >
            CollegeFinder
          </Link>
          <button onClick={closeMenu} className="text-white">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col px-4 py-2 space-y-2">
          <NavItemMobile
            href="/"
            icon={<Home size={20} />}
            label="Home"
            active={pathname === "/"}
            onClick={closeMenu}
          />
          <NavItemMobile
            href="/colleges"
            icon={<Building2 size={20} />}
            label="Colleges"
            active={pathname === "/colleges"}
            onClick={closeMenu}
          />
          <NavItemMobile
            href="/exams"
            icon={<PenBox size={20} />}
            label="Exams"
            active={pathname === "/exams"}
            onClick={closeMenu}
          />
          <NavItemMobile
            href="/scholarships"
            icon={<FaMoneyBillWave size={20} />}
            label="Scholarships"
            active={pathname === "/scholarships"}
            onClick={closeMenu}
          />
          <NavItemMobile
            href="/about"
            icon={<Book size={20} />}
            label="About"
            active={pathname === "/about"}
            onClick={closeMenu}
          />
          <NavItemMobile
            href="/user/dashboard"
            icon={<User size={20} />}
            label="Profile"
            active={pathname.startsWith("/user")}
            onClick={closeMenu}
          />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, label, active }) => (
  <Link
    href={href}
    className={`flex items-center px-4 py-2 rounded-lg transition-all ${
      active ? "text-blue-700 bg-gray-200" : "text-gray-300 hover:text-white"
    }`}
  >
    {icon && <span className="mr-2">{icon}</span>}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const NavItemMobile = ({ href, icon, label, active, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 text-base rounded-md transition-colors ${
      active ? "bg-gray-300 text-blue-700" : "text-gray-300 hover:text-white"
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
