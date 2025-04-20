"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: "User registered successfully! Redirecting...",
        });
        setTimeout(() => router.push("/user/login"), 1500);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col lg:flex-row items-center justify-center px-6 py-10 gap-10 lg:gap-20">
      {/* Features Section */}
      <div className="w-full lg:w-1/2 max-w-xl text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Why Join <span className="text-blue-600">College Finder?</span>
        </h2>
        <ul className="space-y-3 text-gray-700 text-base">
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
          <Link href="/user/login" className="text-blue-500 hover:underline">
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

      {/* Form Section */}
      <div className="w-full lg:w-1/2 max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Register
        </h2>

        {message && (
          <div
            className={`p-2 mb-4 text-white text-center rounded ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full p-2 text-white rounded transition ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/user/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        <p className="mt-1 text-sm text-gray-600 text-center">
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
}

