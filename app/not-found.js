import React from "react";
import Link from "next/link";

function notFound() {
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

export default notFound;
