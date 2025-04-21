"use client";

import React, { useState } from "react";

export default function SponsorUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ hide, setHide ] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you can integrate with your backend API to save the sponsor information
      const res = await fetch("/api/contact-sponsor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", company: "", message: "" });
        setLoading(false);
        setHide(true);
      } else {
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setLoading(false);
    }
  };

  if (hide) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Thank you for your interest!</h1>
          <p className="text-gray-500 text-lg">We will get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-8 bg-white text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Become a Sponsor
        </h1>
        <p className="text-gray-500 text-lg">
          Partner with us to bring your brand to a wide audience at our upcoming events.
        </p>
      </div>

      {/* Sponsorship Benefits */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Why Sponsor Us?</h2>
        <ul className="text-gray-600 text-left md:text-center px-2">
          <li className="mb-2">Reach thousands of engaged participants across various events.</li>
          <li className="mb-2">Showcase your brand and services to a wide, diverse audience.</li>
          <li className="mb-2">Benefit from marketing and promotional opportunities before, during, and after the event.</li>
          <li className="mb-2">Get premium exposure on all our media channels, including social media and event materials.</li>
        </ul>
      </div>

      {/* Sponsor Contact Form */}
      {formSubmitted ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold text-green-600">Thank you for your interest!</h2>
          <p className="text-gray-500">
            We have received your message and will get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Your Company/Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message/Inquiry
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Inquiry"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Footer Section */}
      {/* <div className="text-center text-gray-500 mt-12">
        <p>&copy; 2025 Your Event. All Rights Reserved.</p>
      </div> */}
    </div>
  );
}
