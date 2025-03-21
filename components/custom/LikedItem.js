// ("use client");

import { useState, useEffect } from "react";

export default function LikedItems({ userId }) {
  const [likedData, setLikedData] = useState({
    likedColleges: [],
    likedExams: [],
    likedScholarships: [],
  });

  useEffect(() => {
    const fetchLikedData = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();
        setLikedData(data.user || {});
      } catch (error) {
        console.error("Error fetching liked items:", error);
      }
    };

    if (userId) fetchLikedData();
  }, [userId]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Liked Items</h2>

      <h3 className="text-lg font-medium">Liked Colleges</h3>
      {likedData.likedColleges.length > 0 ? (
        likedData.likedColleges.map((college) => (
          <p key={college._id}>{college.name}</p>
        ))
      ) : (
        <p>No liked colleges.</p>
      )}

      <h3 className="text-lg font-medium">Liked Exams</h3>
      {likedData.likedExams.length > 0 ? (
        likedData.likedExams.map((exam) => <p key={exam._id}>{exam.name}</p>)
      ) : (
        <p>No liked exams.</p>
      )}

      <h3 className="text-lg font-medium">Liked Scholarships</h3>
      {likedData.likedScholarships.length > 0 ? (
        likedData.likedScholarships.map((scholarship) => (
          <p key={scholarship._id}>{scholarship.name}</p>
        ))
      ) : (
        <p>No liked scholarships.</p>
      )}
    </div>
  );
}
