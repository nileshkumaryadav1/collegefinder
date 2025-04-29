import NotFound from "@/components/custom/NotFound";
import Link from "next/link";
// import { connectDB } from "@/utils/db"; // MongoDB connection utility
import Scholarship from "@/models/Scholarship"; // Mongoose Scholarship model
import connectToDatabase from "@/lib/mongodb";

// Generate static params for all scholarships
export async function generateStaticParams() {
  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch scholarship slugs from MongoDB
    const scholarships = await Scholarship.find({}, "slug").limit(15); // Get only the 'slug' field

    // Return the slugs in the required format for static generation
    return scholarships.map((scholarship) => ({
      slug: scholarship.slug,
    }));
  } catch (error) {
    console.error("generateStaticParams DB error:", error);
    return []; // Fallback to empty array if error occurs
  }
}

// Generate metadata for each scholarship page
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch the specific scholarship based on slug
    const scholarship = await Scholarship.findOne({ slug }).exec();

    if (!scholarship) {
      return {
        title: "Scholarship not found",
        description: "Scholarship not found",
      };
    }

    // Metadata based on scholarship
    return {
      title: `${scholarship.name} - College Finder`,
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
  } catch (error) {
    console.error("generateMetadata DB error:", error);
    return {
      title: "Scholarship not found",
      description: "Scholarship not found",
    };
  }
}

// Default page to render for each scholarship slug
export default async function Page({ params }) {
  const { slug } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch the scholarship based on slug
    const scholarship = await Scholarship.findOne({ slug }).exec();

    if (!scholarship) return <NotFound />; // Render NotFound if no scholarship is found

    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold mb-2 text-blue-800">
            {scholarship.name}
          </h1>
          <p className="text-gray-700 mb-6">{scholarship.about}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Amount
              </h2>
              <p className="text-gray-600">{scholarship.amount}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Deadline
              </h2>
              <p className="text-gray-600">
                {scholarship.deadline
                  ? new Date(scholarship.deadline).toISOString().slice(0, 10)
                  : "No deadline"}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Type</h2>
              <p className="text-gray-600">{scholarship.level}</p>
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
  } catch (error) {
    console.error("Page DB error:", error);
    return <NotFound />;
  }
}
