"use client";

import { useState, useEffect } from "react";
import UserCard from "@/components/custom/UserCard";
import Loading from "@/components/custom/Loading";

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

  if (loading || !user) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-800 to-blue-900 md:py-10 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Profile Section */}
        <div className="md:w-1/3 w-full text-center">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">Welcome, {user.name}</h2>
          <UserCard user={user} />
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
              <p className="text-gray-600 text-sm">You have not liked any colleges yet.</p>
            )}
            {tab === "exams" && (
              <p className="text-gray-600 text-sm">You have not liked any exams yet.</p>
            )}
            {tab === "scholarships" && (
              <p className="text-gray-600 text-sm">You have not liked any scholarships yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
