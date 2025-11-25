import React from "react";
import Link from "next/link";
import { PiWarningCircleBold } from "react-icons/pi"; // Install if not already: npm i react-icons

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl text-center border border-gray-200">

          {/* Title */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-blue-600 mb-3 tracking-tight">
          College Finder
        </h1>
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <PiWarningCircleBold className="text-yellow-300" size={70} />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Page Not Available
        </h1>

        {/* Sub text */}
        <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
          The page you&apos;re looking for is not ready yet.  
          We&apos;re working on bringing it to life soon!
        </p>

        {/* Decorative divider */}
        <div className="my-6">
          <span className="inline-block w-20 h-1 bg-blue-600 rounded-full"></span>
        </div>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
        >
          Go Back Home 🏠
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
