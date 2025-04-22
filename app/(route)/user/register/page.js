"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 6000); // Auto-hide message after 6 seconds
  };

  const handleGenerateOtp = async () => {
    const { email } = getValues();

    if (!email || !email.trim()) {
      showMessage("error", "Please enter a valid email");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || data.error || "Failed to send OTP");

      setStep(2);
      showMessage("success", "OTP sent to your email");
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    const { name, email, password } = getValues();

    if (!otp || !otp.trim()) {
      showMessage("error", "Please enter the OTP");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          otp: otp.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || data.error || "Registration failed");

      showMessage("success", "Registered successfully! Redirecting...");
      setTimeout(() => router.push("/user/login"), 1500);
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
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
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-1">Welcome!</h2>
        <p className="text-sm mb-5 text-center text-gray-600">Please fill in the form below to <strong>Register</strong>.</p>

        {message && (
          <div
            className={`mb-4 p-2 rounded text-center text-sm ${message.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
          >
            {message.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit(
            step === 1 ? handleGenerateOtp : handleRegister
          )}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-medium block">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border px-3 py-2 rounded"
              disabled={step === 2}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium block">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border px-3 py-2 rounded"
              disabled={step === 2}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium block">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border px-3 py-2 rounded"
              disabled={step === 2}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {step === 2 && (
            <div>
              <label className="text-sm font-medium block">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Processing..." : step === 1 ? "Send OTP" : "Register"}
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
