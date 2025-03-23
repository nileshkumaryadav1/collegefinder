import LikeButton from "./LikeButton";

export default function CollegeCard({ college, userId }) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold">{college.name}</h3>
      <p className="text-sm text-gray-600">{college.description}</p>
      <LikeButton itemId={college._id} userId={userId} type="likedColleges" />
    </div>
  );
}
