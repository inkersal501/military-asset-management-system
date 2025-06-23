import mongoose from "mongoose";

const baseSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    location: { type: String },
  },
  { timestamps: true }
);

const Base = mongoose.model("Base", baseSchema);
export default Base;
