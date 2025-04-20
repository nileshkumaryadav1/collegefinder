"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/custom/Loading";

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
  }, [router]);

  if (loading) return <Loading />;

  return <>{children}</>;
}
