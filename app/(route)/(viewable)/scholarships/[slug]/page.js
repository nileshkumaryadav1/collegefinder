import NotFound from "@/components/custom/NotFound";
import Link from "next/link";
import Scholarship from "@/models/Scholarship";
import connectToDatabase from "@/lib/mongodb";

// ==========================
// Static Params
// ==========================
export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const scholarships = await Scholarship.find({}, "slug").limit(20);
    return scholarships.map((s) => ({ slug: s.slug }));
  } catch (error) {
    console.error("generateStaticParams error:", error);
    return [];
  }
}

// ==========================
// Metadata (SEO)
// ==========================
export async function generateMetadata({ params }) {
  const { slug } = params;
  try {
    await connectToDatabase();
    const scholarship = await Scholarship.findOne({ slug });

    if (!scholarship) {
      return {
        title: "Scholarship Not Found | CollegeFinder",
        description: "Scholarship details not available",
      };
    }

    return {
      title: `${scholarship.name} – Eligibility, Amount, Deadline | CollegeFinder`,
      description: scholarship.about?.slice(0, 160),
      openGraph: {
        images: scholarship.imageUrl ? [{ url: scholarship.imageUrl }] : [],
      },
    };
  } catch {
    return {
      title: "Scholarship Not Found | CollegeFinder",
      description: "Scholarship details not available",
    };
  }
}

// ==========================
// Page
// ==========================
export default async function Page({ params }) {
  const { slug } = params;

  try {
    await connectToDatabase();
    const scholarship = await Scholarship.findOne({ slug });

    if (!scholarship) return <NotFound />;

    return (
      <div className="max-w-7xl mx-auto px-4 md:py-10 py-4">
        {/* ================= Hero Section ================= */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-2 md:space-y-4">
            {/* Title Card */}
            <div className="bg-[var(--background)] text-[var(--foreground)] rounded-2xl shadow p-8 border border-[var(--border)]">
              <h1 className="text-3xl font-bold text-blue-800 mb-2">
                {scholarship.name}
              </h1>
              <p className="leading-relaxed">
                {scholarship.about}
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                  Type: {scholarship.level}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">
                  Amount: {scholarship.amount}
                </span>
                <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full">
                  Deadline:{" "}
                  {scholarship.deadline
                    ? new Date(scholarship.deadline).toISOString().slice(0, 10)
                    : "Open"}
                </span>
              </div>
            </div>

            {/* ================= Eligibility ================= */}
            <section className="bg-[var(--background)] text-[var(--foreground)] rounded-2xl shadow p-8 border border-[var(--border)]">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Eligibility Criteria
              </h2>
              <p className="leading-relaxed">
                {scholarship.eligibility ||
                  "Eligibility details not specified."}
              </p>
            </section>

            {/* ================= Application Process ================= */}
            <section className="bg-[var(--background)] text-[var(--foreground)] rounded-2xl shadow p-8 border border-[var(--border)]">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Application Process
              </h2>

              <ol className="space-y-3 list-decimal list-inside">
                <li>Check eligibility criteria carefully.</li>
                <li>Prepare required documents.</li>
                <li>Visit the official scholarship website.</li>
                <li>Fill and submit the application form.</li>
                <li>Track application status.</li>
              </ol>
            </section>

            {/* ================= Important Dates ================= */}
            <section className="bg-[var(--background)] text-[var(--foreground)] rounded-2xl shadow p-8 border border-[var(--border)]">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Important Dates
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold">Application Deadline</p>
                  <p className="text-[var(--secondary)]">
                    {scholarship.deadline
                      ? new Date(scholarship.deadline)
                          .toISOString()
                          .slice(0, 10)
                      : "Not announced"}
                  </p>
                </div>
              </div>
            </section>

            {/* ================= FAQ (SEO Booster) ================= */}
            <section className="bg-[var(--background)] text-[var(--foreground)] rounded-2xl shadow p-8 border border-[var(--border)]">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <p>
                  <strong>Who can apply?</strong>
                  <br />
                  Students meeting the eligibility criteria can apply.
                </p>
                <p>
                  <strong>Is this scholarship renewable?</strong>
                  <br />
                  Depends on the official guidelines.
                </p>
                <p>
                  <strong>How is the scholarship amount paid?</strong>
                  <br />
                  Usually via bank transfer or institution credit.
                </p>
              </div>
            </section>

            {/* Back */}
            <Link
              href="/scholarships"
              className="inline-block text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Back to all scholarships
            </Link>
          </div>

          {/* ================= Sticky Apply Card ================= */}
          <aside className="lg:sticky top-24 h-fit">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Scholarship Overview
              </h3>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Amount:</strong> {scholarship.amount}
                </p>
                <p>
                  <strong>Type:</strong> {scholarship.level}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {scholarship.deadline
                    ? new Date(scholarship.deadline).toISOString().slice(0, 10)
                    : "Open"}
                </p>
              </div>

              <a
                href={scholarship.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6 text-center bg-white text-blue-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Apply on Official Website →
              </a>
            </div>
          </aside>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Scholarship page error:", error);
    return <NotFound />;
  }
}
