"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingSkeleton from "./myself/LoadingSkeleton";

function CollegeCard({ filters, sortBy, sortOrder }) {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const limit = 9; // matches backend pagination limit

  /* Reset page when filters change */
  useEffect(() => {
    setPage(1);
  }, [filters, sortBy, sortOrder]);

  /* Fetch Colleges */
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          ...filters,
          sortBy,
          sortOrder,
          page,
          limit,
        });

        const res = await fetch(`/api/colleges?${params}`);
        const data = await res.json();

        setColleges(data.colleges || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
      setLoading(false);
    };

    fetchColleges();
  }, [filters, sortBy, sortOrder, page]);

  const totalPages = Math.ceil(total / limit);

  const formatCurrency = (num) =>
    num ? Number(num).toLocaleString("en-IN") : null;

  return (
    <section className="mt-10">
      {/* RESULT HEADER */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-800">{colleges.length}</span>{" "}
          of <span className="font-semibold text-gray-800">{total}</span>{" "}
          Colleges
        </p>

        {totalPages > 1 && (
          <p className="text-xs text-gray-400">
            Page {page} of {totalPages}
          </p>
        )}
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      ) : colleges.length === 0 ? (
        /* EMPTY STATE */
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
          <p className="text-gray-500 text-lg font-medium">No colleges found</p>
          <p className="text-sm text-gray-400 mt-2">
            Try adjusting filters or clearing them.
          </p>
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college) => (
              <Link
                key={college.slug}
                href={`/colleges/${college.slug}`}
                className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={college.imageUrl || "/placeholder.png"}
                    alt={college.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {college.nirfRanking && college.nirfRanking <= 50 && (
                    <span className="absolute top-4 left-4 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      ⭐ Top Ranked
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Image
                      src={college.logoUrl || "/placeholder.png"}
                      alt={college.name}
                      width={45}
                      height={45}
                      className="object-contain rounded-md"
                    />

                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                      {college.type}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {college.name}
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    {college.city}, {college.state}
                  </p>

                  <div className="space-y-2 text-sm text-gray-700">
                    {college.fees?.total && (
                      <p>
                        <span className="font-medium">Fees:</span> ₹
                        {formatCurrency(college.fees.total)}
                      </p>
                    )}

                    {college.placements?.BTech?.average && (
                      <p>
                        <span className="font-medium">Avg Package:</span>{" "}
                        {college.placements.BTech.average} LPA
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <span className="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-xl font-medium group-hover:bg-blue-700 transition">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-12">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition"
              >
                ← Previous
              </button>

              <span className="text-sm font-medium text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default CollegeCard;
