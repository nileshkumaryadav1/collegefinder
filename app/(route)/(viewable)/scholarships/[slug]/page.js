// app/(route)/(viewable)/scholarships/[slug]/page.js
import NotFound from "@/components/custom/NotFound";
import Link from "next/link";

// export async function generateStaticParams() {
//   const res = await fetch(`https://collegefinder.site/api/scholarships`);
//   const scholarships = await res.json();

//   return scholarships.map((scholarship) => ({
//     slug: scholarship.slug,
//   })).slice(0, 15);
// }

export async function generateMetadata({ params }) {
  const slug = params.slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/scholarships/${slug}`
  );

  if (!res.ok) {
    console.log("error");
  }

  const data = await res.json();
  const scholarship = data;

  if (!scholarship)
    return {
      title: "Scholarship not found",
      description: "Scholarship not found",
    };

  return {
    title: scholarship.name + " - College Finder",
    description: `${scholarship.name} - Date, Eligibility, Syllabus, Deadline, Website, and more.`,
    openGraph: {
      images: [
        {
          url: scholarship.imageUrl,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const slug = params.slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/scholarships/${slug}`
  );

  if (!res.ok) {
    console.log(res);
  }

  const data = await res.json();
  const scholarship = data;

  if (!scholarship) return <NotFound />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-2 text-blue-800">
          {scholarship.name}
        </h1>
        <p className="text-gray-600 text-xs">{scholarship.slug}</p>
        <p className="text-gray-700 mb-6">{scholarship.about}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Amount</h2>
            <p className="text-gray-600">{scholarship.amount}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Deadline
            </h2>
            <p className="text-gray-600">
              {scholarship.deadline?.slice(0, 10)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Type</h2>
            <p className="text-gray-600">{scholarship.type}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Eligibility
            </h2>
            <p className="text-gray-600">{scholarship.eligibility}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Link
            href="/scholarships"
            className="text-gray-700 hover:text-white text-sm btn btn-primary"
          >
            ← Back to Scholarships page
          </Link>

          <a
            href={scholarship.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            Visit Official Website
          </a>
        </div>
      </div>
    </div>
  );
}
