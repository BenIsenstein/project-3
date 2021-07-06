require('./db')
const mongoose = require('mongoose')

// Define CalendarEntries Collection Schema
const calendarEntrySchema = new mongoose.Schema({
    date: Date,
    item: String,
    task: String,
    description: String
})
  
// Define functions
const CalendarEntry = mongoose.model("CalendarEntry", calendarEntrySchema, "CalendarEntries")

const addCalendarEntry = async (newCalendarEntry) => await newCalendarEntry.save()
const listAllCalendarEntries = async () => await CalendarEntry.find({}, null, {sort: {date: 1}})
const findCalendarEntryById = async (id) => await CalendarEntry.findOne({ _id: id })
const deleteCalendarEntry = async (id) => await CalendarEntry.deleteOne({ _id: id })

module.exports = {
  CalendarEntry,
  addCalendarEntry,
  listAllCalendarEntries,
  findCalendarEntryById,
  deleteCalendarEntry
}