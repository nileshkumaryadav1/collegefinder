"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        });
        localStorage.setItem("token", result.token);
        setTimeout(() => router.push("/user/dashboard"), 1500);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong!" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-10">
      <div className="bg-[var(--background)] rounded-xl shadow-xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
        {/* Left - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-[var(--foreground)] mb-6">
            Login to your College Finder account
          </p>

          {message && (
            <div
              className={`p-3 text-white text-center font-medium rounded ${
                message.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200 cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
          <p className="text-sm text-center mt-4">
            Do not have an account?{" "}
            <Link
              href="/user/register"
              className="text-blue-600 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>

        {/* Right - Features */}
        <div className="w-full md:w-1/2 bg-blue-50 dark:bg-slate-800 p-8 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
            ✨ What you will get after signing in
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-500">📬</span>
              Regular Exam Notifications
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">🎓</span>
              College Admission Alerts
            </li>
            <li className="flex items-center gap-2">
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
  );
}
