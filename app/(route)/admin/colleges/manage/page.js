"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminAddCollegePage() {
  const router = useRouter();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch colleges
  const fetchColleges = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/colleges");
      const data = await res.json();
      setColleges(data.colleges || []);
    } catch (err) {
      console.error("Error fetching colleges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Do you really want to delete this college?")) return;

    try {
      const res = await fetch(`/api/admin/colleges/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("College deleted!");
        fetchColleges(); // refresh list
      } else {
        const err = await res.json();
        alert(err.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen md:p-6">
      <div className="max-w-7xl mx-auto md:mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            Existing Colleges ({colleges.length})
          </h2>
        </div>

        {loading ? (
          <div>Loading colleges...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <div key={college._id} className="bg-white p-4 rounded-lg shadow">
                <Image
                  src={college.logoUrl}
                  alt={college.name}
                  width={80}
                  height={80}
                  className="rounded mb-2 object-contain"
                />

                <h3 className="font-bold text-lg">{college.name}</h3>
                <p className="text-sm text-gray-500">{college.location}</p>

                <Link href={`/colleges/${college.slug}`} target="_blank">
                  <button className="text-blue-600 text-sm border rounded p-2 cursor-pointer w-full">
                    View
                  </button>
                </Link>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() =>
                      router.push(`/admin/colleges/${college.slug}`)
                    }
                    className="text-yellow-500 text-sm border rounded p-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(college._id)}
                    className="text-red-600 text-sm border border-red-600 rounded p-2 hover:bg-red-600 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
