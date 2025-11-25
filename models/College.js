import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
  {
    // =========================
    // 🏫 Basic Information
    // =========================
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, required: true },
    shortName: String, // e.g., IITB, NITK
    establishedYear: Number,
    location: { type: String, required: true },
    address: String,
    state: String,
    city: String,
    pincode: String,
    phone: String,
    email: String,
    websiteUrl: String,
    logoUrl: String,
    imageUrl: String,
    gallery: [String], // multiple campus images
    virtualTourLink: String,

    // =========================
    // 🏛️ Institutional Details
    // =========================
    type: { type: String, enum: ["Government", "Private", "Deemed", "Autonomous"] },
    affiliation: String,
    approvedBy: [String], // e.g., AICTE, UGC, NBA
    accreditedBy: [String], // e.g., NAAC A+, NBA
    departments: [String],
    governingBody: String,
    university: String,
    about: String,
    description: String,

    // =========================
    // 🎓 Academic Information
    // =========================
    coursesOffered: [
      {
        program: { type: String, enum: ["B.Tech", "M.Tech"], required: true },
        specialization: { type: String, required: true },
        duration: String,
        eligibility: String,
        intake: Number,
        entranceExams: [String], // e.g., JEE Main, GATE
        mode: { type: String, enum: ["Full-time", "Part-time", "Online"] },
        totalFees: String,
        hostelFees: String,
        feeWaiver: String,
        syllabusPdf: String,
      },
    ],

    admissionProcess: String,
    cutOff: [
      {
        year: Number,
        program: { type: String, enum: ["B.Tech", "M.Tech"] },
        specialization: String,
        category: String,
        exam: String,
        closingRank: String,
      },
    ],

    // =========================
    // 🏠 Fees & Financials
    // =========================
    fees: {
      tuition: String,
      hostel: String,
      misc: String,
      waiver: String,
      total: String,
      modeOfPayment: [String], // e.g., Online, DD, Bank Transfer
      scholarshipAvailable: { type: Boolean, default: false },
    },

    scholarships: [
      {
        name: String,
        eligibility: String,
        amount: String,
        link: String,
      },
    ],

    // =========================
    // 🌿 Facilities
    // =========================
    facilities: [String],
    campusArea: String, // e.g., "150 acres"
    hostels: {
      boys: Boolean,
      girls: Boolean,
      capacity: String,
      description: String,
    },
    sportsFacilities: [String],
    clubs: [String],
    events: [String],

    // =========================
    // 💼 Placements (B.Tech + M.Tech)
    // =========================
    placements: {
      BTech: {
        highest: String,
        average: String,
        median: String,
        ratio: String,
        recruiters: [String],
        topRecruitersLogos: [String],
        placementReportPdf: String,
        yearwiseStats: [
          {
            year: Number,
            highest: String,
            average: String,
            median: String,
            placedStudents: Number,
            totalStudents: Number,
          },
        ],
      },
      MTech: {
        highest: String,
        average: String,
        median: String,
        ratio: String,
        recruiters: [String],
        topRecruitersLogos: [String],
        placementReportPdf: String,
        yearwiseStats: [
          {
            year: Number,
            highest: String,
            average: String,
            median: String,
            placedStudents: Number,
            totalStudents: Number,
          },
        ],
      },
      placementCellContact: String,
    },

    // =========================
    // 🏆 Rankings & Recognition
    // =========================
    nirfRanking: Number,
    otherRankings: [
      {
        source: String, // e.g., Times, Outlook
        year: Number,
        rank: Number,
      },
    ],
    nirfPdf: String,

    // =========================
    // 🌐 Online Presence
    // =========================
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
      youtube: String,
    },

    // =========================
    // 📊 Analytics & Engagement
    // =========================
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    approved: { type: Boolean, default: false },

    // =========================
    // 🧠 SEO & Metadata
    // =========================
    keywords: [String],
    tags: [String],
    seo: {
      title: String,
      description: String,
      keywords: [String],
      canonicalUrl: String,
    },

    // =========================
    // 🧾 Metadata
    // =========================
    noOfStudents: Number,
    noOfFaculties: Number,
    lastUpdatedBy: String,
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Full-text search index
CollegeSchema.index({
  name: "text",
  location: "text",
  state: "text",
  description: "text",
  tags: "text",
});

export default mongoose.models.College || mongoose.model("College", CollegeSchema);
