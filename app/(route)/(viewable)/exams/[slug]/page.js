import NotFound from "@/components/custom/NotFound";
import Link from "next/link";
import Exam from "@/models/Exam"; // Mongoose Exam model
import connectToDatabase from "@/lib/mongodb";

// Generate static params for all exams
export async function generateStaticParams() {
  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch exam slugs from MongoDB
    const exams = await Exam.find({}, "slug").limit(15); // Get only the 'slug' field

    // Return the slugs in the required format for static generation
    return exams.map((exam) => ({
      slug: exam.slug,
    }));

  } catch (error) {
    console.error("generateStaticParams DB error:", error);
    return []; // Fallback to empty array if error occurs
  }
}

// Generate metadata for each exam page
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch the specific exam based on slug
    const exam = await Exam.findOne({ slug }).exec();

    if (!exam) {
      return {
        title: "Exam not found",
        description: "Exam not found",
      };
    }

    // Metadata based on exam
    return {
      title: `${exam.name} - College Finder`,
      description: `${exam.name} - Date, Eligibility, Syllabus, Deadline, Website, and more.`,
      openGraph: {
        images: [
          {
            url: exam.imageUrl,
            width: 800,
            height: 600,
          },
        ],
      },
    };

  } catch (error) {
    console.error("generateMetadata DB error:", error);
    return {
      title: "Exam not found",
      description: "Exam not found",
    };
  }
}

// Default page to render for each exam slug
export default async function Page({ params }) {
  const { slug } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch the exam based on slug
    const exam = await Exam.findOne({ slug }).exec();

    if (!exam) return <NotFound />; // Render NotFound if no exam is found

    return (
      <div className="max-w-4xl mx-auto p-6">
        {exam.imageUrl && (
          <img
            src={exam.imageUrl}
            alt={exam.name}
            className="w-full object-cover object-center border rounded-lg shadow-md"
          />
        )}
        <h1 className="text-3xl font-bold mt-4">{exam.name}</h1>
        <p className="text-gray-700">{exam.date}</p>
        <p className="text-gray-700 mt-2">
          Category: {exam.type} | Slug: {exam.slug}
        </p>
        <p className="text-gray-800 mt-2 text-justify">
          Eligibility: {exam.eligibility}
        </p>
        <p className="mt-4 text-justify">Syllabus: {exam.syllabus}</p>
        <div className="flex justify-between">
          <Link
            href="/exams"
            className="text-gray-600 mt-4 py-2 w-2/5 btn btn-primary"
          >
            ← Back to Exams
          </Link>
          <a
            href={exam.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 mt-4 w-1/2 btn btn-link"
          >
            Visit Official Website
          </a>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Page DB error:", error);
    return <NotFound />;
  }
}
