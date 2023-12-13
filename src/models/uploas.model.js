const mongoose = require('mongoose');

const imageDetailsSchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const ImageDetails = mongoose.model('uploads', imageDetailsSchema);

module.exports = ImageDetails;
