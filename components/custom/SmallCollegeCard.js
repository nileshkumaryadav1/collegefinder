"use client";

import Link from "next/link";
import Image from "next/image";

export default function SmallCollegeCard({ college }) {
  return (
    <Link
      href={`/colleges/${college.slug}`}
      className={`
    group relative block overflow-hidden rounded-xl
    border border-[var(--border)] bg-[var(--background)]
    shadow-sm transition hover:shadow-lg
    min-w-[260px] max-w-[260px] md:min-w-[300px] md:max-w-[600px]
    flex-shrink-0
  `}
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-40 md:h-52 sm:h-44">
        <Image
          src={college.imageUrl}
          alt={college.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* ✅ MOBILE LOGO (fixed bottom center) */}
        <div className="absolute bottom-2 left-10 -translate-x-1/2 md:hidden z-10">
          <div className="bg-white rounded-full p-1 shadow border">
            <Image
              src={college.logoUrl}
              alt={`${college.name} logo`}
              width={50}
              height={50}
              className="object-contain rounded-full"
            />
          </div>
        </div>

        {/* Desktop Hover Overlay */}
        <div className="absolute inset-0 hidden md:flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-4">
          <Image
            src={college.logoUrl}
            alt={`${college.name} logo`}
            width={40}
            height={40}
            className="w-16 h-16 object-contain rounded bg-white border border-[var(--border)] rounded-full"
          />
          <h3 className="text-white font-semibold text-sm line-clamp-2">
            {college.name}
          </h3>
          <p className="text-xs text-gray-200 mt-1">{college.location}</p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs bg-white/90 text-black px-2 py-0.5 rounded">
              {college.type}
            </span>

            {college.nirfRanking && (
              <span className="text-xs text-yellow-300 font-semibold border border-[var(--border)] px-2 py-0.5 rounded-full">
                #{college.nirfRanking}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE CONTENT ================= */}
      <div className="p-3 md:hidden">
        <h3 className="text-sm font-semibold line-clamp-1">{college.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-1">{college.location}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            {college.type}
          </span>

          {college.nirfRanking && (
            <span className="text-[11px] text-gray-600 border border-[var(--border)] px-2 py-0.5 rounded-full">
              #{college.nirfRanking}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
