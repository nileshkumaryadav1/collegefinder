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
        router.push("/user/login");
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
          router.push("/user/login");
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

    if (!confirmDelete) return; // Stop if user cancels

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
      window.location.reload();
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="p-4 bg-gray-100 flex flex-col md:flex-row gap-6">
      {/* User Info Card */}
      <div className="w-full md:w-1/3">
        <UserCard user={user} />

        <button
          onClick={() => deleteUser(user.email)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition w-full mt-4"
        >
          Delete Account
        </button>
      </div>

      {/* Liked Colleges, Exams, Scholarships */}
      <div className="w-full md:w-2/3">
        <Tabs
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
          centered
          variant="fullWidth"
          className="mb-4"
        >
          <Tab label="Liked Colleges" value="colleges" />
          <Tab label="Liked Exams" value="exams" />
          <Tab label="Liked Scholarships" value="scholarships" />
        </Tabs>

      </div>
    </div>
  );
}
