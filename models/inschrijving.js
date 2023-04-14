const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  coach: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  handled: {
    type: Boolean,
    required: true,
  },
});

const Inschrijving = mongoose.model("Inschrijving", userSchema);

module.exports = Inschrijving;
