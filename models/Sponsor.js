import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    about: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Sponsor ||
  mongoose.model("Sponsor", sponsorSchema);
