"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/user/login");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="md:h-150 h-130 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h2>
        {user ? (
          <>
            <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-red-500">Error loading user details.</p>
        )}
      </div>
    </div>
  );
}
