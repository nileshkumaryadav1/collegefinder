"use client";
import { useState, useEffect } from "react";

export default function LikeButton({ itemId, userId, type }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikedItems = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();
        if (data.user?.[type]?.includes(itemId)) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Error fetching liked items:", error);
      }
    };

    if (userId) fetchLikedItems();
  }, [userId, itemId, type]);

  const handleLike = async () => {
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, itemId, type }),
      });

      const data = await res.json();
      if (data.success) {
        setLiked(!liked);
      }
    } catch (error) {
      console.error("Error liking item:", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`mt-2 p-2 rounded-lg text-white ${liked ? "bg-red-500" : "bg-gray-400"}`}
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
