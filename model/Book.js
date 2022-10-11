const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  pdfUrl: {
    type: String,
    required: true,
    unique: true,
  },
  isPublic: {
    type: Boolean,
    dafault: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
