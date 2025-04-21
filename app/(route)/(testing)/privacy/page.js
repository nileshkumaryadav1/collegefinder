"use client";

import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen px-6 py-12 md:px-20 lg:px-40 bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Privacy Policy</h1>

      <p className="mb-6 text-gray-600">
        At College Finder, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information when you use our platform.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">1. Information We Collect</h2>
        <p className="text-gray-600">
          We may collect personal details such as your name, email address, location, and educational preferences. We also collect anonymous usage data to improve our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">2. How We Use Your Information</h2>
        <p className="text-gray-600">
          Your information helps us personalize your experience, respond to queries, send updates, and improve our services. We do not sell or rent your personal data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">3. Cookies and Tracking</h2>
        <p className="text-gray-600">
          We use cookies and similar technologies to enhance user experience and track site performance. You can choose to disable cookies via your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">4. Data Security</h2>
        <p className="text-gray-600">
          We implement security measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute protection against all threats.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">5. Third-Party Services</h2>
        <p className="text-gray-600">
          We may integrate with third-party services (like analytics or SMS providers). These services may collect data in accordance with their own privacy policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">6. Children&apos;s Privacy</h2>
        <p className="text-gray-600">
          Our platform is not intended for users under the age of 13. We do not knowingly collect personal data from children.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">7. Changes to this Policy</h2>
        <p className="text-gray-600">
          We may update our privacy policy from time to time. Updates will be posted on this page with a revised effective date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">8. Contact Us</h2>
        <p className="text-gray-600">
          If you have questions about this Privacy Policy, contact us at{" "}
          <a href="mailto:contact@collegefinder.com" className="text-blue-600 underline">
            contact@collegefinder.com
          </a>.
        </p>
        <p className="mt-10 text-sm text-gray-500 text-center">
        Last updated on: April 21, 2025
      </p>
      </section>
    </div>
  );
}
