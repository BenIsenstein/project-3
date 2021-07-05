require('./db')
const mongoose = require('mongoose');


const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String
})

module.exports = mongoose.model('Auth', authSchema, 'auth');