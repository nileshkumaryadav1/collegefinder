import NotFound from "@/components/custom/NotFound";
import Post from "@/models/Post"; // Mongoose Post model
import connectToDatabase from "@/lib/mongodb";

// Generate static params for all insights
export async function generateStaticParams() {
  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch posts slugs from MongoDB
    const posts = await Post.find({}, "slug").limit(15); // Get only the 'slug' field

    // Return the slugs in the required format for static generation
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("generateStaticParams DB error:", error);
    return []; // Fallback to empty array if error occurs
  }
}

// Generate metadata for each insight page
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch the specific post based on slug
    const post = await Post.findOne({ slug }).exec();

    if (!post) {
      return {
        title: "Insight not found",
        description: "Insight not found",
      };
    }

    // Metadata based on post
    return {
      title: `${post.title} - College Finder`,
      description: `${post.summary?.slice(0, 30)}...`, // Truncate summary for description
      openGraph: {
        images: [
          {
            url: post.imageUrl,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.error("generateMetadata DB error:", error);
    return {
      title: "Insight not found",
      description: "Insight not found",
    };
  }
}

// Default page to render for each slug
export default async function Page({ params }) {
  const { slug } = params;

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Fetch the post based on slug
    const post = await Post.findOne({ slug }).exec();

    if (!post) return <NotFound />; // Render NotFound if no post is found

    return (
      <>
        <main className="max-w-4xl mx-auto px-4 py-10">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-3">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500">
              Published on {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </header>

          <section className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-10">
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-auto rounded-md mb-4 object-cover"
              />
            )}
            <p className="text-gray-700 text-lg leading-relaxed">
              {post.summary}
            </p>
          </section>

          <section className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Content</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </section>
        </main>
      </>
    );
  } catch (error) {
    console.error("Page DB error:", error);
    return <NotFound />;
  }
}
