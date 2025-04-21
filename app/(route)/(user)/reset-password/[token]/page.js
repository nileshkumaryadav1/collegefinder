"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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
        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

        <p className="text-sm text-center mt-2">
          Do you remember your password?{" "}
          <Link href="/user/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
          .
        </p>

        {/* Helpful sections */}
        <div className="mt-6 grid gap-6 text-sm text-gray-600">
          {/* Post-reset tips */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="text-blue-700 font-semibold mb-2">
              ✅ After Password Reset
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>You&apos;ll be redirected to the login page automatically</li>
              <li>Use your new password to log in</li>
              <li>
                If you don&apos;t get redirected,{" "}
                <Link
                  href="/user/login"
                  className="text-blue-600 hover:underline"
                >
                  click here
                </Link>
              </li>
            </ul>
          </div>

          {/* Tips to choose a strong password */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h3 className="text-yellow-700 font-semibold mb-2">
              🛡️ Tips for a Strong Password
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Use a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>Don&apos;t reuse passwords from other sites</li>
              <li>Use a password manager to safely store passwords</li>
              <li>Make it at least 8 characters long</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
