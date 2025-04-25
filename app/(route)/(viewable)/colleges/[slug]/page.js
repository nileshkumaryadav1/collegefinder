"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SingleCollegeCard from "@/components/custom/SingleCollegeCard";
import NotFound from "@/components/custom/NotFound";
import CollegeLoading from "@/components/loading/CollegeLoading";

export default function DetailCollegeCard() {
  const { slug } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await fetch(`/api/colleges/${slug}`);
        const data = await res.json();
        setCollege(data.data);
      } catch (error) {
        console.error("Error fetching college:", error);
      }
      setLoading(false);
    };

    fetchCollege();
  }, [slug]);

  if (loading) return <CollegeLoading />;
  if (!college) return <NotFound />;

  return (
    <section className="text-gray-600 body-font w-full overflow-hidden bg-gray-100">
      <div className="md:max-w-11/12 mx-auto md:p-6">
        <SingleCollegeCard college={college} />
      </div>
    </section>
  );
}
