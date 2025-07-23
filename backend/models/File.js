const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  compressedName: { type: String },
  type: { type: String, required: true },
  originalSize: { type: Number, required: true },
  compressedSize: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  downloadUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
