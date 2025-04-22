"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function ReviewRating({ collegeId }) {
  const [allReviews, setAllReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [filterRating, setFilterRating] = useState(0); // 0 = All
  const [form, setForm] = useState({ userName: "", rating: 0, comment: "" });
  const [hovered, setHovered] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Fetch reviews
  useEffect(() => {
    if (!collegeId) return;

    fetch(`/api/reviews?collegeId=${collegeId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllReviews(sorted);
        setFilteredReviews(sorted);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [collegeId]);

  // Filter reviews based on selected rating
  useEffect(() => {
    if (filterRating === 0) {
      setFilteredReviews(allReviews);
    } else {
      const filtered = allReviews.filter((r) => r.rating === filterRating);
      setFilteredReviews(filtered);
    }
    setVisibleCount(3); // reset on filter change
  }, [filterRating, allReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, collegeId }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      const newReview = await res.json();
      const updatedReviews = [newReview, ...allReviews];
      setAllReviews(updatedReviews);
      setForm({ userName: "", rating: 0, comment: "" });
      setHovered(0);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const avgRating =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length || 0;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <h2 className="text-2xl font-bold text-blue-700">Review and Ratings</h2>
      <p className="text-sm text-gray-600 mb-6">
        Average Rating:{" "}
        <span className="font-medium text-yellow-500">
          {avgRating.toFixed(1)} out of 5
        </span>{" "}
        ({allReviews.length} review{allReviews.length !== 1 && "s"})
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["All", 5, 4, 3, 2, 1].map((r, idx) => (
          <button
            key={idx}
            onClick={() => setFilterRating(r === "All" ? 0 : r)}
            className={`px-3 py-1 rounded border text-sm ${
              filterRating === (r === "All" ? 0 : r)
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {r === "All" ? "All" : `${r} ★`}
          </button>
        ))}
      </div>

      {/* Recent/All Reviews */}
      {filteredReviews.length > 0 ? (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {showAll ? "All Reviews" : "Recent Reviews"}
          </h3>
          <div className="space-y-5">
            {filteredReviews.slice(0, visibleCount).map((rev, i) => (
              <div
                key={rev._id || i}
                className="bg-white p-4 border rounded-md shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">{rev.userName}</p>
                  <span className="text-xs text-gray-500">
                    {rev.createdAt ? formatDate(rev.createdAt) : ""}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        rev.rating > idx ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill={rev.rating > idx ? "#facc15" : "none"}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{rev.comment}</p>
              </div>
            ))}
          </div>

          {/* Load More or See All */}
          {filteredReviews.length > visibleCount && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="mt-4 text-blue-600 text-sm hover:underline"
            >
              Load More
            </button>
          )}

          {/* {filteredReviews.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="ml-4 mt-4 text-blue-600 text-sm hover:underline"
            >
              {showAll ? "Show Less" : "See All Reviews"}
            </button>
          )} */}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-6">No reviews yet.</p>
      )}

      {/* Leave a Review Form */}
      <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={form.userName}
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
          className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer transition ${
                (hovered || form.rating) >= star
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setForm({ ...form, rating: star })}
              fill={(hovered || form.rating) >= star ? "#facc15" : "none"}
            />
          ))}
        </div>

        <textarea
          rows={4}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          placeholder="Write your review about college..."
          className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
