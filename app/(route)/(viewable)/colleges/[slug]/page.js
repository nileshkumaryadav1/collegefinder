// app/(route)/(viewable)/colleges/[slug]/page.js
import SingleCollegeCard from "@/components/custom/SingleCollegeCard";
import NotFound from "@/components/custom/NotFound";

export async function generateStaticParams() {
  const res = await fetch(`https://collegefinder.site/api/colleges`);
  const colleges = await res.json();

  return colleges.map((college) => ({
    slug: college.slug,
  })).slice(0, 15);
}

export async function generateMetadata({ params }) {
  const slug = params.slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/colleges/${slug}`
  );

  if (!res.ok) {
    console.log("error");
  }

  const data = await res.json();
  const college = data.data;

  if (!college)
    return {
      title: "College not found",
      description: "College not found",
    };

  return {
    title: college.name + " - College Finder",
    description: `${college.name} - Fees, placemets, cutoffs, admission process, courses, and more.`,
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
}

export default async function DetailCollegeCard({ params }) {
  const slug = params.slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/colleges/${slug}`
  );

  if (!res.ok) {
    console.log(res);
  }

  const data = await res.json();
  const college = data.data;

  if (!college) return <NotFound />;

  return (
    <section className="text-gray-600 body-font w-full overflow-hidden bg-gray-100">
      <div className="md:max-w-11/12 mx-auto md:p-6">
        <SingleCollegeCard college={college} />
      </div>
    </section>
  );
}
