"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setMsg(data.message);
        setTimeout(() => (window.location.href = "/user/login"), 5000);
      } else {
        setError(data.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Forgot Your Password?
        </h2>
        <p className="text-gray-600 text-sm mb-4 text-center">
          Enter your registered email. We will send you a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {msg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 text-green-700 text-sm bg-green-100 rounded"
          >
            ✅ {msg} <br />
            <strong>Now:</strong> Check your email inbox (and spam folder) for a
            reset link. Click it and set a new password.
          </motion.div>
        )}

        {error && (
          <p className="mt-4 text-red-600 text-sm bg-red-50 p-3 rounded">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <p>
            Do you remember your password?{" "}
            <Link href="/user/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
            .
          </p>
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/user/register"
              className="text-blue-600 hover:underline"
            >
              Register now
            </Link>
            .
          </p>
        </div>

        {/* Helpful sections */}
        <div className="mt-2 grid gap-6 text-sm text-gray-600">
          {/* What to do after email is sent */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="text-blue-700 font-semibold mb-2">
              📩 What to do next
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Check your email inbox (and spam folder) for a reset link</li>
              <li>Click the link to open the reset password page</li>
              <li>Create your new password and submit</li>
            </ul>
          </div>
        </div>

        {/* Tips to remember password */}
        <div className="mt-3 text-sm text-gray-500">
          <h3 className="font-semibold mb-1">
            🔒 Tips to remember your password:
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Use a mix of letters, numbers, and symbols</li>
            <li>Do not use easily guessable info like birthdays</li>
            <li>Use a password manager for storing securely</li>
            <li>Write it down in a personal diary if needed</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
