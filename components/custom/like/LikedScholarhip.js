"use client";
import { useState, useEffect } from "react";

export default function LikedScholarships({ userId }) {
  const [likedScholarships, setLikedScholarships] = useState([]);

  useEffect(() => {
    const fetchLikedScholarships = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();
        setLikedScholarships(data.user?.likedScholarships || []);
      } catch (error) {
        console.error("Error fetching liked scholarships:", error);
      }
    };

    if (userId) fetchLikedScholarships();
  }, [userId]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Liked Scholarships</h2>
      {likedScholarships.length > 0 ? (
        likedScholarships.map((scholarship) => (
          <div key={scholarship._id} className="p-2 border-b">
            <h3 className="text-lg font-medium">{scholarship.name}</h3>
            <p className="text-sm text-gray-600">{scholarship.description}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">You have not have liked any scholarships yet.</p>
      )}
    </div>
  );
}
