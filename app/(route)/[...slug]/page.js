// app/[...slug]/page.js
"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CatchAllRoute() {
  const { slug } = useParams(); // This will capture all path segments in the URL

  // slug is an array that contains all path segments
  console.log(slug); // Example: ['blog', '2025', 'nextjs-tutorial']

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Page</h1>
      <p className="text-lg mb-6">Sorry! The page is not setup yet.</p>
      <Link href="/" className="text-blue-600 hover:underline text-lg">
        ← Go back to Home
      </Link>
    </div>
  );
}
