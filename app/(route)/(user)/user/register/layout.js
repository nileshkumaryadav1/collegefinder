"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 flex flex-col lg:flex-row items-center justify-center px-6 py-10 gap-10 lg:gap-20">
          {/* Features Section */}
          <div className="w-full lg:w-1/2 max-w-xl text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">
              Why Join <span className="text-blue-600">College Finder?</span>
            </h2>
            <ul className="space-y-3 text-base">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">📬</span>
                Get regular <strong>exam updates</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">🎓</span>
                Never miss <strong>admission deadlines</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-500">📊</span>
                Personalized <strong>college suggestions</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">📰</span>
                Trending <strong>education news</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-500">✅</span>
                Free & easy to use
              </li>
            </ul>
            <p className="mt-6 text-sm text-gray-600">
              Already a member?{" "}
              <Link
                href="/user/login"
                className="text-blue-500 hover:underline"
              >
                Login here
              </Link>
              .
            </p>
            <p className="mt-1 text-sm text-gray-600">
              <Link
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              By registering, you agree to our{" "}
              <Link href="/terms" className="text-blue-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </>
    );

  return <>{children}</>;
}
