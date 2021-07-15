require('./db')
const mongoose = require('mongoose')

// Define Testers Collection Schema
const testerSchema = new mongoose.Schema({
  email: String
})

// Define functions
const Tester = mongoose.model("tester", testerSchema, "testers")

const listAllTesters = async () => await Tester.find({}, null)
const findTesterByEmail = async (address) => await Tester.findOne({ email: address })

module.exports = {
  Tester,
  listAllTesters,
  findTesterByEmail
}