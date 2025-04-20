"use client";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(""); // Reset error message
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    
    const data = await res.json();

    if (res.ok) {
      setMsg(data.message);
      alert("Check your email for password reset instructions.");
      setTimeout(() => window.location.href = "/user/login", 1500);
    } else {
      setError(data.message || "Something went wrong, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading} // Disable input while loading
            required
            aria-describedby="emailHelp"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            aria-live="polite"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        {msg && <p className="mt-4 text-green-600 text-sm">{msg}</p>}
        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>} {/* Error message */}

        <p className="mt-4 text-gray-600 text-sm">
          Remember your password?{" "}
          <Link href="/user/login" className="text-blue-600 hover:underline">
            Login
          </Link>
          {""} here.
        </p>

        <p className="mt-2 text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/user/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
          {""} & get started!
        </p>
      </div>
    </div>
  );
}
