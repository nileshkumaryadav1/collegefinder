"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/"); // Redirect to home if token available
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading)
    return (
      <>
        <div className="md:min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
            {/* Right - Features */}
            <div className="w-full bg-blue-50 py-20 flex flex-col justify-center">
              <h3 className="md:text-3xl text-2xl font-semibold text-gray-700 md:mb-4 text-center">
                ✨ What you will get after signing in
              </h3>
              <ul className="flex flex-col md:items-center gap-2 text-md text-gray-700 p-4">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">📬</span>
                  Regular Exam Notifications
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">🎓</span>
                  College Admission Alerts
                </li>
                <li className="flex md:items-center gap-2">
                  <span className="text-purple-500">📊</span>
                  Personalized College Recommendations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">📰</span>
                  Education News & Updates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">💾</span>
                  Save Favorite Colleges
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-500">⚙️</span>
                  Dashboard Access & More!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );

  return <>{children}</>;
}
