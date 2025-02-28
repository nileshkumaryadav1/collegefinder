import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
  name: String,
  location: String,
  ranking: Number,
  image: String,
  description: String,
  website: String,
}, { timestamps: true });

export default mongoose.models.College || mongoose.model("College", CollegeSchema);
