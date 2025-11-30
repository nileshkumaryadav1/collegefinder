// CollegeLoading.js
import Head from "next/head";

export default function CollegeLoading() {
  return (
    <>
      <Head>
        <title>Loading College | College Finder</title>
        <meta
          name="description"
          content="Searching for detailed college information including courses, placement, ranking, and facilities."
        />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4">
        {/* SVG Spinner */}
        <svg
          className="animate-spin h-14 w-14 mb-6 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          role="img"
          aria-label="Loading spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>

        {/* Branding Text */}
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Loading College Information...
        </h1>
        <p className="text-lg text-gray-600 text-center mt-2 max-w-md">
          Please wait while we load verified data about courses, fees, rankings, placements, and more.
        </p>

        {/* Static Fallback Content for SEO */}
        <section className="sr-only">
          <h2>Explore Top Colleges in India</h2>
          <p>
            Find details like admission process, facilities, cutoffs, placement records, and student reviews on College Finder.
          </p>
        </section>
      </main>
    </>
  );
}
