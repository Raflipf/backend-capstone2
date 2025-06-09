const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  complaint: { type: String },
  priority: { type: String },
  status: { type: String },
  timestamp: { type: Date, default: Date.now },
  queueNumber: { type: Number },
  examinationStartTime: { type: Date },
  completionTime: { type: Date },
  diagnosis: { type: String },
  prescription: { type: String },
  notes: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Queue", queueSchema);
