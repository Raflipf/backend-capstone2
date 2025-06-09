const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nik: { type: String, unique: true, required: true },
  birthDate: { type: Date },
  gender: { type: String },
  bloodType: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  emergencyContact: { type: String },
  photos: [{ type: String }], // array of photo URLs or paths
  embeddings: [{ type: String }], // array of embeddings as strings or base64
  registrationDate: { type: Date, default: Date.now },
  status: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Patient", patientSchema);
