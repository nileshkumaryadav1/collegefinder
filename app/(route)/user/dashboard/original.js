"use client";

import { useState, useEffect } from "react";
import UserCard from "@/components/custom/UserCard";
import UserCardAlt from "@/components/custom/NewUserCard";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("colleges");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/user/login";
        return;
      }

      try {
        const res = await fetch("/api/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
          window.location.href = "/user/login";
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const deleteUser = async (email) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone!"
    );

    if (!confirmDelete) return;

    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    alert(result.message);

    if (res.ok) {
      localStorage.removeItem("token");
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  if (loading || !user)
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-800 to-blue-900 md:py-10 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Profile Section */}
        <div className="md:w-1/3 w-full text-center">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">
            Welcome, {user.name}
          </h2>
          <UserCard user={user} />
          {/* <UserCardAlt user={user}/> */}
        </div>

        {/* Right Panel */}
        <div className="md:w-2/3 w-full flex flex-col gap-6">
          {/* Delete Button */}
          <div className="flex justify-end">
            <button
              onClick={() => deleteUser(user.email)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Delete Account
            </button>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4">
            {["colleges", "exams", "scholarships"].map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  tab === item
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item === "colleges"
                  ? "Liked Colleges"
                  : item === "exams"
                    ? "Liked Exams"
                    : "Liked Scholarships"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            {tab === "colleges" && (
              <p className="text-gray-600 text-sm">
                You have not liked any colleges yet.
              </p>
            )}
            {tab === "exams" && (
              <p className="text-gray-600 text-sm">
                You have not liked any exams yet.
              </p>
            )}
            {tab === "scholarships" && (
              <p className="text-gray-600 text-sm">
                You have not liked any scholarships yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
