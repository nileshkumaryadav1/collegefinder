"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(""); // Reset error message
    const res = await fetch(`/api/auth/reset-password/${token}`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (res.ok) {
      setMsg(data.message);
      setTimeout(() => window.location.href = "/user/login", 1500);
    } else {
      setError(data.message || data.error || "Something went wrong, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            aria-label="New password"
            aria-describedby="passwordHelp"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {msg && <p className="mt-4 text-green-600 text-sm">{msg}</p>}
        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>} {/* Error message */}
      </div>
    </div>
  );
}
