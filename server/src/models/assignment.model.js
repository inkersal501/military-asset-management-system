import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema({
  assetType: { type: String, required: true },
  quantity: { type: Number, required: true }, 
  assignedTo: { type: String }, 
  baseId: { type: mongoose.Schema.Types.ObjectId, ref: "Base", required: true },
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  remarks: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
