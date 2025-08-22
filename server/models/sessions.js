const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
