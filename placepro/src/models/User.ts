import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    role: { type: String, enum: ["student", "admin"], default: "student" },
    department: String,
    college: String,
    year: String,
    phone: String,
    skills: [String],
    readinessScore: { type: Number, default: 72 },
    resumeScore: { type: Number, default: 65 },
    streak: { type: Number, default: 5 },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);