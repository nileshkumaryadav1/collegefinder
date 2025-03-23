"use client";

import { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import UserCard from "@/components/custom/UserCard";
import LikedItems from "@/components/custom/like/LikedItem";
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

  if (!user) return <Loading />;

  return (
    <div className="p-4 bg-gray-100 flex flex-col md:flex-row gap-6">
      {/* User Info Card */}
      <div className="w-full md:w-1/3">
        <UserCard user={user} />
      </div>

      {/* Liked Colleges, Exams, Scholarships */}
      <div className="w-full md:w-2/3">
        <Tabs value={tab} onChange={(e, newTab) => setTab(newTab)} centered variant="fullWidth" className="mb-4">
          <Tab label="Liked Colleges" value="colleges" />
          <Tab label="Liked Exams" value="exams" />
          <Tab label="Liked Scholarships" value="scholarships" />
        </Tabs>

        <LikedItems type={tab} user={user} />
      </div>
    </div>
  );
}
