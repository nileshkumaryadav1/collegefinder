import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  location: String,
  phone: String,
  email: String,
  nirfRanking: Number,
  imageUrl: String,
  logoUrl: String,
  description: String,
  courses: String,
  affiliation: String,
  type: String,
  admissionProcess: String,
  fees: String,
  hostelFees: String,
  otherFees: String,
  feeWaiver: String,
  cutOff:String,
  facilities: String,
  noOfStudents: Number,
  noOfFaculties: Number,
  highestPlacement: String,
  averagePlacement: String,
  medianSalary: String,
  websiteUrl: String,
  placementRatio: String,
  pastRecruitor: String,
}, { timestamps: true });

export default mongoose.models.College || mongoose.model("College", CollegeSchema);
