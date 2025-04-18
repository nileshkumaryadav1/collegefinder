"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Verify() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleVerify = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    // Check for valid email and OTP
    if (!email || !email.includes("@") || !otp) {
      setError("Please provide a valid email and OTP.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      // If the response is not okay, throw an error with the message
      if (!res.ok) {
        throw new Error(data.error || "OTP verification failed");
      }

      // Display success message if verification succeeds
      setMessage(data.message || "OTP verified successfully!");
      setTimeout(() => {
        router.push("/user/dashboard");
      }, 2000); // 2-second delay
    } catch (err) {
      // Handle any errors that occur
      setError(err.message);
    } finally {
      // Stop the loading spinner
      setLoading(false);
    }
  };

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-gray-100 p-4">  
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify OTP
        </h2>

        {/* Email Input */}
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* OTP Input */}
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
          } transition`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Success Message */}
        {message && (
          <p className="text-green-600 text-center font-medium">{message}</p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}
