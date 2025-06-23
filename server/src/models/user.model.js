import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, minLength: 6, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["admin", "commander", "logistics"],
      required: true,
    },
    baseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Base",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
