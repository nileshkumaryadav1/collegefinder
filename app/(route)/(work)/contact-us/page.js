"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResponseMessage("");

    try {
      // Simulate successful submission
      setTimeout(() => {
        setSubmitting(false);
        setResponseMessage("Thank you for contacting us! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1500);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      setResponseMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
        Contact CollegeFinder
      </h1>
      <p className="text-center text-gray-600 mb-10">
        We are here to assist you. Reach out to us through any of the methods below.
      </p>

      {/* Support Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Company Support */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Support</h3>
          <p className="text-gray-700 mb-1">Phone: +91 62055 30252</p>
          <p className="text-gray-700">Support Email: nileshkumarextra@gmail.com</p>
        </div>

        {/* Help Mail */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Help Desk</h3>
          <p className="text-gray-700 mb-1">General Queries</p>
          <p className="text-gray-700">Email: nileshkumarextra@gmail.com</p>
        </div>

        {/* Locations */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Our Office</h3>
          <p className="text-gray-700 mb-1">CollegeFinder Office</p>
          <p className="text-gray-700">Katihar, Bihar, India - 84700</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Message</label>
            <textarea
              name="message"
              rows="5"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>

          {responseMessage && (
            <p className="text-center mt-4 text-green-600 font-semibold">{responseMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
