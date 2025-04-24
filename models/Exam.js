import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    eligibility: { type: String, required: true },
    syllabus: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
