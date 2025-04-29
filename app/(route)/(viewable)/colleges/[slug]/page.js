import SingleCollegeCard from "@/components/custom/SingleCollegeCard";
import NotFound from "@/components/custom/NotFound";
// import { connectDB } from "@/utils/db"; // MongoDB connection utility
import College from "@/models/College"; // Mongoose College model
import connectToDatabase from "@/lib/mongodb";

// Generate static params for all colleges
export async function generateStaticParams() {
  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch college slugs from MongoDB
    const colleges = await College.find({}, "slug").limit(15); // Get only the 'slug' field

    // Return the slugs in the required format for static generation
    return colleges.map((college) => ({
      slug: college.slug,
    }));

  } catch (error) {
    console.error("generateStaticParams DB error:", error);
    return []; // Fallback to empty array if error occurs
  }
}

// Generate metadata for each college page
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch the specific college based on slug
    const college = await College.findOne({ slug }).exec();

    if (!college) {
      return {
        title: "College not found",
        description: "College not found",
      };
    }

    // Metadata based on college
    return {
      title: `${college.name} - College Finder`,
      description: `${college.name} - Fees, placements, cutoffs, admission process, courses, and more.`,
      openGraph: {
        images: [
          {
            url: college.imageUrl,
            width: 800,
            height: 600,
          },
        ],
      },
    };

  } catch (error) {
    console.error("generateMetadata DB error:", error);
    return {
      title: "College not found",
      description: "College not found",
    };
  }
}

// Default page to render for each college slug
export default async function DetailCollegeCard({ params }) {
  const { slug } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch the college based on slug
    const college = await College.findOne({ slug }).exec();

    if (!college) return <NotFound />; // Render NotFound if no college is found

    return (
      <section className="text-gray-600 body-font w-full overflow-hidden bg-gray-100">
        <div className="md:max-w-11/12 mx-auto md:p-6">
          <SingleCollegeCard college={college} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Page DB error:", error);
    return <NotFound />;
  }
}
