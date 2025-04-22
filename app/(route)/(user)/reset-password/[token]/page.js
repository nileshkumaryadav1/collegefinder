"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`/api/auth/reset-password/${token}`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setMsg(data.message);
      setTimeout(() => (window.location.href = "/user/login"), 1500);
    } else {
      setError(
        data.message || data.error || "Something went wrong, please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md md:max-w-4xl bg-white p-6 md:p-10 rounded-xl md:rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Reset Password Form */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-3 text-center md:text-left">
            Reset Your Password
          </h2>
          <p className="text-gray-600 text-sm mb-4 text-center md:text-left">
            Set a new password for your account.
          </p>

          <form onSubmit={handleReset}>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              aria-label="New password"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {msg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 text-green-700 text-sm bg-green-100 rounded"
            >
              ✅ {msg}
            </motion.div>
          )}
          {error && (
            <p className="mt-4 text-red-600 text-sm bg-red-50 p-3 rounded">
              {error}
            </p>
          )}

          <p className="text-sm text-center mt-4 text-gray-700">
            Remembered your password?{" "}
            <Link href="/user/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
            .
          </p>
        </div>

        {/* Desktop & mobile shared Helpful Sections */}
        <div className="text-sm text-gray-700 space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg">
            <h3 className="text-blue-700 font-semibold mb-2">
              ✅ After Password Reset
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>You will be redirected to login page automatically</li>
              <li>Use your new password to log in</li>
              <li>
                If not redirected,{" "}
                <Link href="/user/login" className="text-blue-600 hover:underline">
                  click here
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg">
            <h3 className="text-yellow-700 font-semibold mb-2">
              🛡️ Strong Password Tips
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Use uppercase, lowercase, numbers & symbols</li>
              <li>Don not reuse old passwords</li>
              <li>Use a password manager to store safely</li>
              <li>Keep it at least 8 characters long</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
