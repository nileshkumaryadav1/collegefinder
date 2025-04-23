import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  summary: String,
  content: String,
  tags: [String],
  type: { type: String, enum: ["blog", "news", "update"], default: "blog" },
  author: String,
  featured: { type: Boolean, default: false },
  thumbnail: String,
  seoMeta: {
    title: String,
    description: String,
    keywords: [String],
    image: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
