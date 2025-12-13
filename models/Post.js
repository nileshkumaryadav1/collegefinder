import mongoose from "mongoose";

const TableSchema = new mongoose.Schema(
  {
    title: String,
    headers: [String],
    rows: [[String]],
    source: String,
  },
  { _id: false }
);

const ContentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "paragraph",
        "heading",
        "list",
        "table",
        "image",
        "alert",
        "quote",
      ],
      required: true,
    },

    // for paragraph / heading / quote / alert
    text: String,

    // for heading
    level: {
      type: Number, // h2, h3, h4
      default: 2,
    },

    // for list
    items: [String],

    // for table
    table: TableSchema,

    // for image
    image: {
      url: String,
      caption: String,
      alt: String,
    },

    // alert style (exam postponed, notice)
    alertType: {
      type: String,
      enum: ["info", "warning", "success", "danger"],
      default: "info",
    },
  },
  { _id: false }
);

const PostSchema = new mongoose.Schema(
  {
    // Core Info
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true, index: true },

    // Article Classification
    category: {
      type: String,
      enum: [
        "exam-news",
        "cutoff",
        "result",
        "admission",
        "ranking",
        "comparison",
        "college-news",
        "general-update",
      ],
      required: true,
    },

    examType: {
      type: String, // JEE, NEET, GATE (optional)
    },

    // Hero / Banner
    hero: {
      title: String,
      subtitle: String,
      image: String,
      imageAlt: String,
    },

    // Summary (Editorial)
    summary: {
      lead: String, // bold first line
      paragraphs: [String], // readable paragraphs
      highlights: [String], // bullet points
    },

    // Main Content (BLOCK BASED)
    contentBlocks: [ContentBlockSchema],

    // Metadata
    tags: [String],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    featured: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },

    // SEO
    seoMeta: {
      title: String,
      description: String,
      keywords: [String],
      image: String,
      canonicalUrl: String,
      metaRobots: {
        type: String,
        default: "index, follow",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
