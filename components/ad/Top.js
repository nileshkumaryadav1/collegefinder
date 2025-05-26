"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

function Top() {
  const [visible, setVisible] = useState(true);
  const videoId = 'ARCvFpFDEJU'; // Replace with your video ID

  const handleClose = () => {
    setVisible(false);
  };

  const handleVideoClick = () => {
    // Just close the ad on click if you want
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="top-ad"
      className="bg-gradient-to-r from-red-600 to-red-500 text-white px-2 py-2 shadow-md flex items-center justify-between relative animate-slide-in z-50 rounded-b-md dark:from-red-700 dark:to-red-600"
    >
      {/* Left: Icon + Text */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto text-xs sm:text-sm">
        <FaYoutube className="text-xl sm:text-2xl animate-pulse" />
        <span>🎥 Watch our latest YouTube video!</span>
      </div>

      {/* Middle: Thumbnail */}
      <Link
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleVideoClick}
        className="my-2 sm:my-0 mx-2"
      >
        <Image
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt="Latest video"
          width={200}
          height={200}
          className="w-20 sm:w-24 h-auto rounded shadow-md hover:scale-105 transition"
        />
      </Link>

      {/* Right: Subscribe + Close */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/sponsors"
          className="bg-white text-red-600 font-medium px-2 py-1 rounded text-xs sm:text-sm hover:bg-gray-100 transition shadow"
        >
          Subscribe
        </Link>
        <button
          onClick={handleClose}
          className="text-white hover:text-gray-200 transition p-1"
          title="Close"
        >
          <IoClose className="text-lg sm:text-xl" />
        </button>
      </div>
    </div>
  );
}

export default Top;
