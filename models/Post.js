import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true, index: true },
    summary: String,
    content: mongoose.Schema.Types.Mixed, // supports markdown, html, or json
    tags: {
      type: [String],
      enum: ["college", "exam", "scholarship"],
      default: ["college"],
    },
    type: {
      type: String,
      enum: ["blog", "news", "exams", "update"],
      default: "blog",
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    featured: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    thumbnail: String,
    seoMeta: {
      title: String,
      description: String,
      keywords: [String],
      image: String,
      canonicalUrl: String,
      metaRobots: { type: String, default: "index, follow" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
