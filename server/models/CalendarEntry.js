require('./db')
const mongoose = require('mongoose')

// Define CalendarEntries Collection Schema
const calendarEntrySchema = new mongoose.Schema({
  userId: String,
  houseId: String,
  start: Date,
  end: Date,
  item: String,
  task: String,
  description: String,
  completed: Boolean,
  dateCompleted: Date,
  completionComments: String
})
  
// Define functions
const CalendarEntry = mongoose.model("CalendarEntry", calendarEntrySchema, "CalendarEntries")

const addCalendarEntry = async (newCalendarEntry) => await newCalendarEntry.save()
const listAllCalendarEntries = async () => await CalendarEntry.find({}, null, {sort: {start: 1}})
const listAllCalendarEntriesByUserId = async (id) => await CalendarEntry.find({ userId: id}, null, {sort: {start: 1}})
const findCalendarEntryById = async (id) => await CalendarEntry.findOne({ _id: id })
const deleteCalendarEntry = async (id) => await CalendarEntry.deleteOne({ _id: id })

module.exports = {
  CalendarEntry,
  addCalendarEntry,
  listAllCalendarEntries,
  listAllCalendarEntriesByUserId,
  findCalendarEntryById,
  deleteCalendarEntry
}