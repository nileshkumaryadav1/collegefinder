import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true }, // Can be a range or a specific date
    eligibility: { type: String, required: true },
    syllabus: { type: String, required: true },
    website: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
