"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockSponsors = [
    {
      _id: "1",
      name: "TechCorp",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsUTHAz2ss7DkM30-1UvfvZTbYhBQIAOLoMw&s",
      description: "Leading the way in tech innovation.",
      website: "https://techcorp.com",
    },
    {
      _id: "2",
      name: "Innovative Solutions",
      logoUrl: "https://media.licdn.com/dms/image/v2/C4E0BAQGlxtdYQ8pgVQ/company-logo_200_200/company-logo_200_200/0/1630568662986/innovative_solutions_group_inc_logo?e=2147483647&v=beta&t=faStjHrmbMqdI0Twi-Q1oE2Hv1wJnGJ86clejQ0fjKY",
      description: "Pioneers in IT solutions.",
      website: "https://innovativesolutions.com",
    },
  ];

  useEffect(() => {
    setSponsors(mockSponsors);
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   const fetchSponsors = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch("/api/sponsors");
  //       const data = await res.json();
  //       setSponsors(data);
  //     } catch (error) {
  //       console.error("Error fetching sponsors:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSponsors();
  // }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Our Esteemed Sponsors
        </h1>
        <p className="text-gray-500 text-lg">
          We are grateful for the support of our sponsors who make everything
          possible.
        </p>
      </div>

      {/* Sponsor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sponsors.map((sponsor) => (
          <div key={sponsor._id}>
            <div className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer">
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h2 className="text-xl font-semibold text-blue-700">
                {sponsor.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {sponsor.description}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Website:</span>{" "}
                <a
                  // href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {sponsor.website}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Promotional Section */}
      <div className="bg-yellow-100 text-center py-4 mt-10 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-yellow-700">
          Want to become a sponsor?
        </h2>
        <p className="text-sm mt-2 mb-4 text-gray-700">
          If you are interested in sponsoring our upcoming events, we would love to
          partner with you.
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
