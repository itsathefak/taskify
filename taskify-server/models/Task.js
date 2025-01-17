const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  dueDate: { type: Date },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
