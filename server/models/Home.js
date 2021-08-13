require('./db')
const mongoose = require('mongoose');

// User model and functions
const homeSchema = new mongoose.Schema({
  activated: Boolean,
  address: String,
  city: String,
  country: String,
  homeItems: Object,
  homeIcon: Number,
  nickname: String,
  possessionDateByOwner: Date,
  postalCode: String,
  province: String,
  residenceType: String,
  squareFootage: Number,
  userId: String,
  yearBuilt: Number,
  colorScheme: Array,
  customTasks: [{  
    item: String,
    task: String,
    frequency: Number}]
})

const Home = mongoose.model("Home", homeSchema)

module.exports = {
  Home
}