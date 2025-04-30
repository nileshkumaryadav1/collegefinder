"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SponsorsCard() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/sponsors");
        const data = await res.json();
        setSponsors(data);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <div className="px-4 pt-8 bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="md:text-4xl text-2xl font-bold text-blue-600 mb-2">
          Our Esteemed Sponsors
        </h1>
        <p className="text-gray-500 text-sm">
          We are grateful for the support of our sponsors who make everything
          possible.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* No Sponsors */}
      {!loading && sponsors.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No sponsors found.
        </div>
      )}

      {/* Sponsor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._id}
            className="hover:scale-105 transition-transform duration-300"
          >
            <div className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer bg-white">
              <Link href="/sponsors">
                <Image
                  src={sponsor.imageUrl}
                  alt={sponsor.name}
                  width={200}
                  height={200}
                  className="w-full h-40 object-contain mb-2"
                />
              </Link>
              <h2 className="md:text-xl text-md font-semibold text-blue-700">
                {sponsor.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{sponsor.about}</p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Website:</span>{" "}
                <a
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {sponsor.websiteUrl}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Promotional Section */}
      <div className="bg-yellow-100 text-center md:py-6 py-4 mt-10 rounded-lg shadow-lg hidden">
        <h2 className="text-xl font-semibold text-yellow-700">
          Want to become a sponsor?
        </h2>
        <p className="text-sm mt-2 mb-4 px-2 text-gray-700">
          If you are interested in sponsoring our upcoming events, we would love
          to partner with you.
        </p>
        <Link
          href="/sponsor-us"
          className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Become a Sponsor
        </Link>
      </div>
    </div>
  );
}
