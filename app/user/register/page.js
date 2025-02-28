"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
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
        setMessage({ type: "success", text: "User registered successfully!" });
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong!" });
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        
        {message && (
          <div className={`p-2 mb-4 text-white text-center rounded ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <Link href="/user/login" className="text-center block mt-4 text-blue-500">Already have an account? Login</Link>
      </div>
    </div>
  );
}
