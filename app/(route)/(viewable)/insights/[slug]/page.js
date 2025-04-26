// app/(route)/(viewable)/insights/[slug]/page.js
import NotFound from "@/components/custom/NotFound";

// export async function generateStaticParams() {
//   const res = await fetch(`https://collegefinder.site/api/posts`);
//   const insights = await res.json();

//   return insights
//     .map((insight) => ({
//       slug: insight.slug,
//     }))
//     .slice(0, 15);
// }

export async function generateMetadata({ params }) {
  const slug = params.slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`
  );

  if (!res.ok) {
    console.log("error");
  }

  const data = await res.json();
  const insight = data.data;

  if (!insight)
    return {
      title: "Insight not found",
      description: "Insight not found",
    };

  return {
    title: insight.title + " - College Finder",
    description: `${insight.summary?.slice(0, 30) + "..."} `,
    openGraph: {
      images: [
        {
          url: insight.imageUrl,
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`
  );

  if (!res.ok) {
    console.log(res);
  }

  const data = await res.json();
  const post = data.data;

  if (!post) return <NotFound />;

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
      </main>
    </>
  );
}
