"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2,  User, PenBox } from "lucide-react";
import { FaMoneyBillWave } from "react-icons/fa";

const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-900shadow-lg sm:hidden">
      <div className="flex justify-around items-center bg-gray-800 p-3 shadow-md">
        <NavItem href="/" icon={Home} label="Home" active={pathname === "/"} />
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
          active={pathname === "/scholarships"}
        />
        <NavItem
          href="/user/dashboard"
          icon={User}
          label="Dashboard"
          active={pathname === "/user/dashboard" || pathname === "/user/login" || pathname === "/user/register"}
        />
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon: Icon, label, active }) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center px-4 
        py-2 transition-all ${
          active
            ? "text-blue-400 bg-gray-700 rounded-full px-2 py-2"
            : "text-gray-400"
        }`}
    >
      <Icon size={24} className="mb-1" />
      {/* <span className="text-xs font-medium">{label}</span> */}
    </Link>
  );
};

export default MobileNavbar;
