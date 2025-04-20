import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    resetToken: String,
    resetTokenExpiry: Date,
    profileImage: { type: String },
    bio: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    likes: [
      {
        itemId: mongoose.Schema.Types.ObjectId, // ID of the liked item
        itemType: String, // "college", "exam", or "scholarship"
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
