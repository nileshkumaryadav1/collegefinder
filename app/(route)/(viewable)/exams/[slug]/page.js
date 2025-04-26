// app/(route)/(viewable)/exams/[slug]/page.js
import NotFound from "@/components/custom/NotFound";
import Link from "next/link";

// export async function generateStaticParams() {
//   const res = await fetch(`https://collegefinder.site/api/exams`);
//   const exams = await res.json();

//   return exams.map((exam) => ({
//     slug: exam.slug,
//   })).slice(0, 15);
// }

export async function generateMetadata({ params }) {
  const slug = params.slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams/${slug}`
  );

  if (!res.ok) {
    console.log("error");
  }

  const data = await res.json();
  const exam = data.data;

  if (!exam)
    return {
      title: "Exam not found",
      description: "Exam not found",
    };

  return {
    title: exam.name + " - College Finder",
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
}

export default async function Page({ params }) {
  const slug = params.slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams/${slug}`
  );

  if (!res.ok) {
    console.log(res);
  }

  const data = await res.json();
  const exam = data.data;

  if (!exam) return <NotFound />;

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
}
