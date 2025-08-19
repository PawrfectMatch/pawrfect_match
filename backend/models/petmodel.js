const mongoose = require("mongoose");
const { Schema } = mongoose;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  health_status: {
    type: String,
    trim: true
  },
  adopted: {
    type: Boolean,
    default: false
  },
  image_url: {
    type: String,
    trim: true
  }
}, {
  timestamps: true 
});

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet;