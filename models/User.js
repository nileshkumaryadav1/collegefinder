import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    bio: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    likedColleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "College" }],
    likedExams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
    likedScholarships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
