import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    profile: { type: String },
    professional_title: { type: String, trim: true },
    address: { type: String, trim: true },
    short_information: { type: String, trim: true },
    github_url: { type: String, trim: true },
    linkedin_url: { type: String, trim: true },
    company: { type: String, trim: true },
    year: { type: String, trim: true },
    company_address: { type: String, trim: true },
    skills: { type: Array },
    experience: { type: Array },
    is_active: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;