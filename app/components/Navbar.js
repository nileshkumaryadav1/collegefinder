"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for the mobile menu
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-white/30 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black text-blue-500 text-1xl md:text-2xl leading-snug font-manrope font-extrabold flex items-center">
        <Image src="/favicon.ico" alt="" width={50} height={50} className="mr-2" />
        <p className="text-blue-500 text-3xl mr-1">College</p>
        <p className="text-gray-800 text-3xl">Finder</p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-3">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/colleges">Colleges</NavLink>
          <NavLink href="/exams">Exams</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/user/dashboard">Dashboard</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/20 backdrop-blur-md p-4">
          <NavLink href="/" onClick={toggleMenu}>Home</NavLink>
          <NavLink href="/colleges" onClick={toggleMenu}>Colleges</NavLink>
          <NavLink href="/exams" onClick={toggleMenu}>Exams</NavLink>
          {/* <NavLink href="/about" onClick={toggleMenu}>About</NavLink> */}
          <NavLink href="/user/dashboard" onClick={toggleMenu}>Profile</NavLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-lg px-4 py-2 transition ${
        isActive ? "text-black hover:text-blue-400 font-semibold" : "text-black hover:text-blue-300"
      }`}
    >
      {children}
    </Link>
  );
}
