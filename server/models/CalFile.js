require('./db')
const mongoose = require('mongoose');

// User model and functions
const calFileSchema = new mongoose.Schema({
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  filename: String,
  md5: String
})

const CalFile = mongoose.model("CalFile", calFileSchema, "calFile.files")

module.exports = {
  CalFile
}