"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, User, PenBox } from "lucide-react";
import { FaMoneyBillWave } from "react-icons/fa";

const MobileNavbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token in localStorage
  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (!isLoggedIn) return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 sm:hidden shadow-t">
      <div className="flex justify-around items-center bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-2">
        <NavItem
          href="/"
          icon={Home}
          label="Home"
          active={pathname === "/"}
        />
        <NavItem
          href="/colleges"
          icon={Building2}
          label="Colleges"
          active={pathname === "/colleges"}
        />
        <NavItem
          href="/exams"
          icon={PenBox}
          label="Exams"
          active={pathname === "/exams"}
        />
        <NavItem
          href="/scholarships"
          icon={FaMoneyBillWave}
          label="Scholarships"
          active={pathname.startsWith("/scholarships")}
        />
        <NavItem
          href="/user/dashboard"
          icon={User}
          label="Profile"
          active={pathname.startsWith("/user")}
        />
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon: Icon, label, active }) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-200
        ${active
          ? "bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400"
          : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
        }`}
    >
      <Icon size={20} />
      <span className="text-xs mt-0.5">{label}</span>
    </Link>
  );
};

export default MobileNavbar;
