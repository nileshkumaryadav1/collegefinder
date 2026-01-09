"use client";

export default function AdminDashboard() {
  return (
    <div className="md:min-h-screen flex items-center justify-center bg-[var(--background)] px-6 p-8">
      <div className="max-w-xl w-full text-center bg-white dark:bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow-lg p-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-[var(--foreground)]">
          Admin Dashboard
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          This is the central admin panel to manage colleges, exams,
          scholarships, reviews, insights, sponsors, and users.
        </p>

        <div className="mt-4 text-xs text-gray-400">
          🚧 Dashboard widgets & analytics coming soon
        </div>
      </div>
    </div>
  );
}
