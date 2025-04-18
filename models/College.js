import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
  name: String,
  location: String,
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
  facilities: String,
  noOfStudents: Number,
  noOfFaculties: Number,
  averagePlacement: String,
  medianSalary: String,
  websiteUrl: String,
  pastRecruitor: String,
}, { timestamps: true });

export default mongoose.models.College || mongoose.model("College", CollegeSchema);
