"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();

  // Convert "/colleges/details" → ["colleges", "details"]
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav className="bg-transparent p-1 rounded-md">
      <ul className="flex items-center text-gray-600">
        <li>
          <Link href="/" className="hover:text-blue-600">Home</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const fullPath = "/" + pathSegments.slice(0, index + 1).join("/");
          return (
            <li key={fullPath} className="mx-1">
              <span className="mx-1">/</span>
              <Link href={fullPath} className="hover:text-blue-600 capitalize">
                {segment.replace(/-/g, " ")}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
