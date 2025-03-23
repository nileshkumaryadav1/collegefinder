import LikeButton from "./LikeButton";

export default function ExamCard({ exam, userId }) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold">{exam.name}</h3>
      <p className="text-sm text-gray-600">{exam.description}</p>
      <LikeButton itemId={exam._id} userId={userId} type="likedExams" />
    </div>
  );
}
