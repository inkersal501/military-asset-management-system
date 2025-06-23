import mongoose from "mongoose";

const transferSchema = mongoose.Schema(
  {
    assetType: { type: String, required: true },
    quantity: { type: Number, required: true },
    fromBase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Base",
      required: true,
    },
    toBase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Base",
      required: true,
    },
    transferredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Transfer = mongoose.model("Transfer", transferSchema);
export default Transfer;
