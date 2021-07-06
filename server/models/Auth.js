require('./db')
const mongoose = require('mongoose');


const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  dateSignedUp: Date
})

module.exports = mongoose.model('Auth', authSchema);