require('./db')
const mongoose = require('mongoose');

// User model and functions
const homeSchema = new mongoose.Schema({
  address: String,
  city: String,
  country: String,
  homeItems: Array,
  nickname: String,
  possessionDateByOwner: Date,
  postalCode: String,
  province: String,
  residenceType: String,
  squareFootage: Number,
  userId: String,
  yearBuilt: Number,
  colorScheme: Array
})

const Home = mongoose.model("Home", homeSchema)

module.exports = {
  Home
}