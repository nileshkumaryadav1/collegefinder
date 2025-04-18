"use client";

import { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
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
    <div className="min-h-screen px-4 py-6 bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* User Info Card */}
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-4">
          <UserCard user={user} />
          <button
            onClick={() => deleteUser(user.email)}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Delete Account
          </button>
        </div>

        {/* Tabs Section */}
        <div className="w-full md:w-2/3">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-4">
            <Tabs
              value={tab}
              onChange={(e, newTab) => setTab(newTab)}
              variant="fullWidth"
              centered
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Liked Colleges" value="colleges" />
              <Tab label="Liked Exams" value="exams" />
              <Tab label="Liked Scholarships" value="scholarships" />
            </Tabs>

            <div className="mt-6">
              {/* Add content display logic here */}
              {tab === "colleges" && <p className="text-center text-gray-600 dark:text-gray-400">You have not liked any colleges yet.</p>}
              {tab === "exams" && <p className="text-center text-gray-600 dark:text-gray-400">You have not liked any exams yet.</p>}
              {tab === "scholarships" && <p className="text-center text-gray-600 dark:text-gray-400">You have not liked any scholarships yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
