import Head from "next/head";

export default function DefaultLoading() {
  return (
    <>
      <Head>
        <title>Loading | College Finder</title>
        <meta
          name="description"
          content="Discover verified information about colleges, exams, and scholarships across India. Loading the page you requested..."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#1d4ed8" />
        <link rel="canonical" href="https://collegefinder.site" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-blue-800 px-6">
        {/* Logo or Branding Icon */}
        <div className="mb-6">
          <svg
            className="animate-spin h-16 w-16 text-blue-600"
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
        </div>

        {/* Branded Message */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-3 tracking-tight">
          Loading College Finder...
        </h1>
        <p className="text-base sm:text-lg text-gray-700 text-center max-w-md">
          Please wait while we fetch accurate and verified data for this page.
        </p>

        {/* Accessibility & SEO fallback (hidden visually) */}
        <section className="sr-only">
          <h2>College Finder India - Explore Higher Education Opportunities</h2>
          <p>
            College Finder provides trustworthy information on colleges, exams,
            scholarships, placements, rankings, and more to help students make
            informed decisions.
          </p>
        </section>
      </main>
    </>
  );
}
