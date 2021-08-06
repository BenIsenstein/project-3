require('./db')
const mongoose = require('mongoose');

// Info model and functions
const taskInfoSchema = new mongoose.Schema({
    item: String,
    task: String,
    frequency: Number,
  })
  
const TaskInfo = mongoose.model("taskInfo", taskInfoSchema)

module.exports = {
  TaskInfo
}