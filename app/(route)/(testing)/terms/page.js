"use client";

import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen px-6 py-12 md:px-20 lg:px-40 bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Terms & Conditions
      </h1>

      <p className="mb-6 text-gray-600">
        Welcome to College Finder! By accessing or using our platform, you agree
        to the following terms and conditions. Please read them carefully.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          1. Use of the Platform
        </h2>
        <p className="text-gray-600">
          College Finder provides educational information, including college
          details, exams, scholarships, and more. This content is for
          informational purposes only and does not guarantee admission or
          accuracy of data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          2. User Conduct
        </h2>
        <p className="text-gray-600">
          Users must not misuse the platform for illegal activities, harassment,
          spamming, or spreading false information. Any violation may result in
          account suspension or legal action.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          3. Account Responsibility
        </h2>
        <p className="text-gray-600">
          You are responsible for maintaining the confidentiality of your login
          credentials and any activity that occurs under your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          4. Data Accuracy
        </h2>
        <p className="text-gray-600">
          We strive to keep our content updated, but we do not guarantee that
          all college details or exam information will be accurate or current.
          Always verify with the respective official sources.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          5. Third-Party Links
        </h2>
        <p className="text-gray-600">
          College Finder may include links to external websites. We are not
          responsible for the content or privacy practices of these sites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          6. Termination
        </h2>
        <p className="text-gray-600">
          We reserve the right to suspend or terminate user access at our sole
          discretion, especially if these Terms are violated.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          7. Changes to Terms
        </h2>
        <p className="text-gray-600">
          We may update these Terms from time to time. Continued use of the
          platform after changes constitutes your acceptance of the revised
          terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          8. Contact Us
        </h2>
        <p className="text-gray-600">
          If you have any questions regarding these Terms, please contact us at{" "}
          <a
            href="mailto:contact@collegefinder.com"
            className="text-blue-600 underline"
          >
            contact@collegefinder.com
          </a>
          .
        </p>
        <p className="mt-10 text-sm text-gray-500 text-center">
        Last updated on: April 21, 2025
      </p>
      </section>

    </div>
  );
}
