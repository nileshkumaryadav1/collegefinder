import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    publishedDate: { type: String, required: true },
    sourceURL: { type: String, required: true },
  },
  { timestamps: true }
);

const News = mongoose.models.News || mongoose.model("News", newsSchema);
export default News;
