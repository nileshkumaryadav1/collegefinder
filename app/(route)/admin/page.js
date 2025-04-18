"use client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <button
          onClick={() => router.push("/admin/colleges")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Manage Colleges
        </button>

        <button
          onClick={() => router.push("/admin/exams")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Manage Exams
        </button>

        <button
          onClick={() => router.push("/admin/scholarships")}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Manage Scholarships
        </button>
      </div>
    </div>
  );
}
