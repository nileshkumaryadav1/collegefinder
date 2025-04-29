"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="md:min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <button
          onClick={() => router.push("/admin/colleges")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition cursor-pointer"
        >
          Manage Colleges
        </button>

        <button
          onClick={() => router.push("/admin/exams")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition cursor-pointer"
        >
          Manage Exams
        </button>

        <button
          onClick={() => router.push("/admin/scholarships")}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition cursor-pointer"
        >
          Manage Scholarships
        </button>

        <Link
          href="/admin/reviews"
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition cursor-pointer"
        >
          Manage Reviews
        </Link>

        <Link
          href="/admin/insights"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition cursor-pointer"
        >
          Manage Insights
        </Link>
      </div>
    </div>
  );
}
