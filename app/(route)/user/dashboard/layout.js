"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/user/login"); // Redirect to login if no token
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return <>{children}</>;
}
