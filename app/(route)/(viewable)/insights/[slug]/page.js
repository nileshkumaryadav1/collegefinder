import NotFound from "@/components/custom/NotFound";
import Post from "@/models/Post";
import connectToDatabase from "@/lib/mongodb";
import InsightClient from "./InsightClient";

// Generate static params
export async function generateStaticParams() {
  await connectToDatabase();
  const posts = await Post.find({}, "slug").limit(15);
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { slug } = params;
  await connectToDatabase();
  const post = await Post.findOne({ slug }).exec();

  if (!post) {
    return { title: "Insight not found", description: "Insight not found" };
  }

  return {
    title: post.seoMeta?.title || `${post.title} - College Finder`,
    description: post.seoMeta?.description || post.summary?.slice(0, 150),
    keywords: post.seoMeta?.keywords || [],
    openGraph: {
      images: [
        {
          url: post.seoMeta?.image || post.thumbnail || "/default-thumb.png",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

// Server Page
export default async function Page({ params }) {
  await connectToDatabase();
  const post = await Post.findOne({ slug: params.slug }).exec();

  if (!post) return <NotFound />;

  return <InsightClient post={JSON.parse(JSON.stringify(post))} />;
}
