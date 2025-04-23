// /app/admin/reviews/page.js

'use client';
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  async function deleteReview(reviewId) {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Review deleted successfully");
      setReviews(reviews.filter(review => review._id !== reviewId));
    } else {
      alert("Error deleting review");
    }
  }

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Reviews</h1>
      
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">College</th>
              <th className="border px-4 py-2">Rating</th>
              <th className="border px-4 py-2">Author</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td className="border px-4 py-2">{review.collegeId.name}</td>
                <td className="border px-4 py-2">{review.rating}</td>
                <td className="border px-4 py-2">{review.author}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
