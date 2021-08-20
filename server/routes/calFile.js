const express = require('express')
let router = express.Router()
const mongoose = require('mongoose')
const ics = require('ics')
// const icsMulti = require('../../dist')
const fs = require('fs')
const { writeFileSync } = require('fs')
const { CalendarEntry } = require('../models/CalendarEntry')
const { Home } = require('../models/Home')
const { CalFile } = require('../models/CalFile')


// ----------------------------------------------------------------------------
// Add new ICS file for user, requiring their UserId and calFileId.
router.post('/create/', async (req, res) => {
  try {

    const gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      chunkSizeBytes: 1024,
      bucketName: 'calFile'
    })

    let fileName = req.body.calFileId + '.ics'
    let userId = req.body._id

    // Build array of user's calendar entries, but only the incomplete ones, and only
    // for homes that are active.
    let taskListRes = await CalendarEntry.find({ userId: userId, completed: false }, null, { sort: { start: 1 } })
    let calendarEntries = [{}]
    let startString = ""
    let startArray = []
    let endString = ""
    let endArray = []

    if (taskListRes.length > 0) {
      arrayIndexer = 0
      innerIndexer = 0
      while (arrayIndexer < taskListRes.length) {
        currentItem = taskListRes[arrayIndexer]

        startString = currentItem.start.toISOString().substring(0, 10) + '-' + currentItem.start.toISOString().substring(11, 16)
        startString = startString.replace(':', '-')
        startArray = startString.split('-').map(Number)
        endString = currentItem.end.toISOString().substring(0, 10) + '-' + currentItem.end.toISOString().substring(11, 16)
        endString = endString.replace(':', '-')
        endArray = endString.split('-').map(Number)


        // Convert startTime to ics compatible ARRAY in format [YYYY, M, D, Hour, Min]
        
        

        // Only use Calendar Entries that are for ACTIVE homes.
        dbHomeResponse = await Home.findOne({ _id: currentItem.homeId })
        if (dbHomeResponse?.activated) {
          calendarEntries[innerIndexer] = {
            title: 'TASKr Home: ' + dbHomeResponse.nickname + ' - ' + currentItem.item,
            description: currentItem.task + ' : ' + currentItem.description,
            busyStatus: 'FREE',
            // startInputType: 'utc',
            start: startArray,
            end: endArray
            // duration: { minutes: 50 }
          }
          innerIndexer += 1
        }
        arrayIndexer += 1
      }
    }

    console.log("User event list = ", calendarEntries)

    // Create the user's ICS file
    ics.createEvents(calendarEntries,
      // ics.createEvents(
      //   [
      //     {
      //       title: 'Dinner with Micky',
      //       description: 'Nightly thing I do',
      //       busyStatus: 'FREE',
      //       start: [2021, 8, 15, 6, 30],
      //       duration: { minutes: 50 }
      //     },
      //     {
      //       title: 'Lunch with Wolverine',
      //       start: [2021, 10, 15, 12, 15],
      //       duration: { minutes: 45 }
      //     },
      //     {
      //       title: 'Dinner with Goofy',
      //       start: [2021, 9, 15, 12, 15],
      //       duration: { hours: 1, minutes: 30 }
      //     }
      //   ],
      (error, value) => {
        if (error) {
          console.log("Error on validation = ", error)
        }

        // Write file to temporary folder to give it a path for using GridFS stream
        writeFileSync(`tempICS/${fileName}`, value)

        fs.createReadStream(`tempICS/${fileName}`)
          .pipe(gridfsbucket.openUploadStream(fileName))
          .on('error', () => {
            console.log("Error occured uploading file to database:" + error)
          })
          .on('finish', () => {
            console.log("Done uploading ICS file to database")
          })

        // Clean up the temporary file, it is no longer needed.
        fs.unlinkSync(`tempICS/${fileName}`)

      }
    )

    res.json({ success: true })
  }
  catch (err) {
    console.log('Error creating iCalendar ICS file!: ', err)
    res.json({ success: false })
  }
})


// ----------------------------------------------------------------------------
// GET file stored in GridFS
router.get('/link/:fileID', (req, res) => {
console.log("You've reached the GET API for ics files!!!")
  let gridFSbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    chuckSizeBytes: 1024,
    bucketName: 'calFile'
  })

  let realFileName = req.params.fileID + '.ics'

  // Search for file in the GridFS database. When found, capture its '_id' value.
  let resFind = CalFile.findOne({ filename: realFileName })

  if (resFind) {
    console.log("ICS file exists, attempting to retrieve it...")
    // Using the '_id' value from above, convert it into 'ObjectId' format.
    let actualFileId = resFind._id
    const formattedID = mongoose.Types.ObjectId(actualFileId)

    // Pass object stream to requestor    
    gridFSbucket.openDownloadStream(pictureID)
      .pipe(res)
  }

})


// ----------------------------------------------------------------------------
// Delete ICS file by ID
router.delete('/delete/:fileID', async (req, res) => {
  try {
    let delFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      chuckSizeBytes: 1024,
      bucketName: 'calFile'
    })
    let realFileName = req.params.fileID + '.ics'

    // Search for file in the GridFS database. When found, capture its '_id' value.
    let resFind = await CalFile.findOne({ filename: realFileName })

    if (resFind) {
      console.log("ICS file exists, attempting to delete...")
      // Using the '_id' value from above, convert it into 'ObjectId' format.
      let actualFileId = resFind._id
      const fileObjId = mongoose.Types.ObjectId(actualFileId)

      let cursor = await delFSBucket.find({ _id: fileObjId })
      let fileCheck
      cursor.toArray()
        .then((results) => {
          fileCheck = results.length
          if (fileCheck === 0) {
            res.json({ Success: true, Message: 'No file to delete' })
          }
          else {
            delFSBucket.delete(fileObjId)
            // await fileObjId.remove()
            console.log(`Deleted file ${realFileName} from database.`)
            res.json({ Success: true, Message: 'File deleted' })
            // res.json("successfully deleted image!")
          }
        })
    }
    else {
      // no file found, nothing to delete.
      res.json({ Success: true, Message: 'No file to delete' })
    }
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error")
  }
})

module.exports = router
