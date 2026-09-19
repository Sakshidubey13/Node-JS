const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: true // true = active, false = soft deleted (or inactive)
  },
  created_date: {
    type: String,
    required: true
  },
  updated_date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Record', recordSchema);
