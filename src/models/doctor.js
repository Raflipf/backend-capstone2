const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String },
  status: { type: String },
  room: { type: String },
  phone: { type: String },
  schedule: { type: mongoose.Schema.Types.Mixed }, // can be JSON or separate collection
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doctor", doctorSchema);
