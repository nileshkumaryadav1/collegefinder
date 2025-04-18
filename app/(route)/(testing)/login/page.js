"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSendOtp = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setMessage(data.message || "OTP sent successfully!");
      setTimeout(() => {
        router.push("/verify");
      }, 2000); // 2-second delay
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login with OTP
        </h2>

        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          } transition`}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        {message && (
          <p className="text-green-600 text-center font-medium">{message}</p>
        )}

        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}
