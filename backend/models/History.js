const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actionType: { type: String, enum: ['compress', 'convert'], required: true },
  fileType: { type: String, required: true },
  originalName: { type: String, required: true },
  originalSize: { type: Number, required: true },
  compressedSize: { type: Number },
  ratio: { type: Number },
  downloadUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);
