import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  about: { type: String, required: true },
  amount: { type: Number, required: true },
  eligibility: { type: String, required: true },
  deadline: { type: Date, required: true }, 
  officialLink: { type: String, required: true }
});

export default mongoose.models.Scholarship || mongoose.model("Scholarship", scholarshipSchema);
