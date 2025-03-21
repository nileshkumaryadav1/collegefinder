import Link from "next/link";

export default function ScholarshipDetail({ params }) {
    const { id } = params;
  
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Scholarship Details - ID {id}</h1>
        <p className="text-gray-700 mt-2">
          More details about the scholarship will be shown here.
        </p>
        <Link href="/scholarships" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Back to Scholarships
        </Link>
      </div>
    );
  }
  