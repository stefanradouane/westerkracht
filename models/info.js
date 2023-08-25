const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  linkTitle: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  visual: {
    type: String,
    required: true,
  },
});

const Info = mongoose.model("Info", userSchema);

module.exports = Info;
