"use client";

import Image from 'next/image';
import React, { useState } from 'react';

function PopUp() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full text-center">
        {/* CollegeFinder logo or image */}
        <Image 
          src="/logo.png"
          alt="College Finder Logo"
          width={200}
          height={200}
          className="mx-auto h-20 w-20"
        />

        {/* Welcome Message */}
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Welcome to College Finder 🎓</h2>
        <p className="italic text-gray-600 mb-4">The journey to your dream college starts here.</p>

        {/* Features */}
        <ul className="text-sm text-gray-700 text-left mb-4 space-y-2 px-4">
          <li>✅ Explore top colleges with full details</li>
          <li>✅ Compare courses, facilities & placements</li>
          <li>✅ Read real student reviews</li>
          <li>✅ Stay updated with latest exams & scholarships</li>
        </ul>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
        >
          Lets Get Started!
        </button>
      </div>
    </div>
  );
}

export default PopUp;
