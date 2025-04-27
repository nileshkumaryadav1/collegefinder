import React from "react";
import Link from "next/link";

function NotFound() {
  return (
    <div className="md:min-h-screen flex flex-col items-center justify-center p-10 bg-gray-50 text-center">
      <div className="max-w-lg p-10 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-4">
          College Finder
        </h1>
        <p className="md:text-xl text-md text-gray-700 mb-2">
          This page is not set up yet.
        </p>
        <p className="md:text-lg text-sm text-gray-500 mb-8">
          Please check back later, or return to the homepage.
        </p>
        <Link href="/" className="text-blue-600 hover:underline text-lg">
          ← Go back to Home🏠
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
