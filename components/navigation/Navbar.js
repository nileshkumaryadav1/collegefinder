"use client";

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
} from "lucide-react";
import { FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
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
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 border-b border-gray-200 py-2">
      <div className="flex justify-between items-center px-4 md:px-20 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.jpg"
            alt="CollegeFinder Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-lg font-bold text-gray-800 tracking-tight">
            CollegeFinder
          </span>
        </Link>

        {/* Desktop Nav */}
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
          <NavItem href="/about" label="About" active={pathname === "/about"} />
          <NavItem
            href="/user/dashboard"
            icon={<User size={18} />}
            label="Profile"
            active={pathname.startsWith("/user")}
          />
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-gray-800"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform ${
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
