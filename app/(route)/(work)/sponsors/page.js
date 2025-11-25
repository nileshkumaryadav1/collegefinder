"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SponsorsPage() {
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
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-[var(--background)] text-[var(--foreground)]">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-2">
          Our Esteemed Sponsors
        </h1>
        <p className="text-lg text-[var(--secondary)]">
          We are grateful for the support of our sponsors who make everything possible.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--foreground)]"></div>
        </div>
      )}

      {/* No Sponsors */}
      {!loading && sponsors.length === 0 && (
        <div className="text-center text-lg text-[var(--secondary)]">
          No sponsors found.
        </div>
      )}

      {/* Sponsors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._id}
            className="hover:scale-105 transition-transform duration-300"
          >
            <div className="rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer bg-[var(--background)] border border-[var(--border)]">
              <Image
                src={sponsor.imageUrl}
                alt={sponsor.name}
                width={200}
                height={200}
                className="w-full h-40 object-contain mb-4"
              />

              <h2 className="text-xl font-semibold text-[var(--accent)]">
                {sponsor.name}
              </h2>

              <p className="text-sm mb-2 text-[var(--secondary)]">
                {sponsor.about}
              </p>

              <p className="text-sm text-[var(--secondary)]">
                <span className="font-medium text-[var(--foreground)]">Website:</span>{" "}
                <a
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  {sponsor.websiteUrl}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Promotional Section */}
      <div className="text-center py-6 mt-10 rounded-lg shadow-lg bg-[var(--highlight)] text-[var(--foreground)]">
        <h2 className="text-xl font-semibold">
          Want to become a sponsor?
        </h2>
        <p className="text-sm mt-2 mb-4 text-[var(--foreground)] opacity-80">
          If you are interested in sponsoring our upcoming events, we would love to partner with you.
        </p>

        <Link
          href="/sponsor-us"
          className="px-8 py-2 bg-[var(--accent)] text-[var(--foreground)] font-semibold rounded-md hover:opacity-90 transition"
        >
          Become a Sponsor
        </Link>
      </div>
    </div>
  );
}
