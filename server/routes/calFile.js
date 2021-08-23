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
    const wholeFileName = req.body.calFileId + '.ics'
    const userId = req.body._id
    const tempFilePath = `tempICS/${wholeFileName}`

    const gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      chunkSizeBytes: 1024,
      bucketName: 'calFile'
    })

    // Search for the same ICS file in the GridFS database. If found, capture its '_id' value.
    let gridFSRecordId = ""
    let resFileSearch = await CalFile.findOne({ filename: wholeFileName })
    if (resFileSearch?._id) {
      gridFSRecordId = resFileSearch?._id
    }

    // Build array of user's calendar entries, but only the incomplete ones, and only
    // for homes that are active.
    let taskListRes = await CalendarEntry.find({ userId: userId, completed: false }, null, { sort: { start: 1 } })
    let calendarEntries = []
    let startString = ""
    let startArray = []
    let endString = ""
    let endArray = []

    if (taskListRes.length > 0) {
      arrayIndexer = 0
      innerIndexer = 0
      while (arrayIndexer < taskListRes.length) {
        currentItem = taskListRes[arrayIndexer]

        // Convert start and end times from ISO into
        // ics file standard arrary [YYYY, MM, DD, hr, min]
        startString = currentItem.start.toISOString().substring(0, 10) + '-' + currentItem.start.toISOString().substring(11, 16)
        startString = startString.replace(':', '-')
        startArray = startString.split('-').map(Number)
        endString = currentItem.end.toISOString().substring(0, 10) + '-' + currentItem.end.toISOString().substring(11, 16)
        endString = endString.replace(':', '-')
        endArray = endString.split('-').map(Number)

        // Only use Calendar Entries that are for ACTIVE homes.
        let dbHomeResponse = await Home.findOne({ _id: currentItem.homeId })
        if (dbHomeResponse?.activated) {
          calendarEntries[innerIndexer] = {
            title: 'TASKr Home: ' + dbHomeResponse.nickname + ' - ' + currentItem.item,
            description: currentItem.task + ' : ' + currentItem.notes,
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

    if (calendarEntries.length > 0) {

      // Create the user's ICS file
      ics.createEvents(calendarEntries,
        // ics.createEvents(
        //   [
        //     {
        //       title: 'Dinner with Mickey',
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
            console.log("Error on ICS file validation = ", error)
            res.json({ success: false })
          }

          // Write file to temporary folder to give it a path for using GridFS stream
          writeFileSync(tempFilePath, value)

          fs.exists(tempFilePath, (exists) => {
            if (exists) { // Continue only if temporary ICS file was created.

              //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              // Before writing the new ICS file to the database, delete
              // the user's existing one if it exists. If we don't do this
              // the user will end up with multiple ICS files, each with
              // a different document _id, and the GET route will not know
              // which one to stream back to the user's calendar app
              // upon api request.

              if (gridFSRecordId !== "") { // Previous ICS record exists in gridFS
                console.log("Earlier version of the ICS file already exists in DB, attempting to delete...")
                const fileObjId = mongoose.Types.ObjectId(gridFSRecordId)
                let cursor = gridfsBucket.find({ _id: fileObjId })
                let fileCheck
                cursor.toArray()
                  .then((results) => {
                    fileCheck = results.length
                    if (fileCheck === 0) {
                      console.log(`Tried to delete the old version of ${wholeFileName} from database, but file not found.`)
                    }
                    else {
                      gridfsBucket.delete(fileObjId)
                      // await fileObjId.remove()
                      console.log(`Successfully deleted OLD ics file ${wholeFileName} from database.`)
                    }
                  })
              }
              else {
                console.log(`Initial DB query for the _id of ${wholeFileName} found nothing. No file to delete.`)
              }

              //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              // Stream data from the temp file into new file in GridFS.
              console.log("Attempting to create newly updated ICS file in database...")
              fs.createReadStream(tempFilePath)
                .pipe(gridfsBucket.openUploadStream(wholeFileName))
                .on('error', () => {
                  console.log("Error occured uploading new ICS file to database:" + error)
                })
                .on('finish', () => {
                  console.log("Done uploading ICS file to database")
                })

              // Clean up the temporary file if it exists, it is no longer needed.
              //fs.unlinkSync(tempFilePath)
              console.log("Temporary ICS file deleted from 'tempICS' folder.")

            }
            else console.log("NOTE: Temp ICS file should have been created but was not!!!")
          })

        }
      )
    }
    else { // Empty calendar list. Create an empty ICS file for the user.
      fs.createReadStream("tempICS/EmptyICS_DoNotDelete.ics")
        .pipe(gridfsBucket.openUploadStream(wholeFileName))
        .on('error', () => {
          console.log("Error occured uploading EMPTY ICS file to database:" + error)
        })
        .on('finish', () => {
          console.log("Done uploading EMPTY ICS file to database")
        })
    }

    res.json({ success: true })
  }
  catch (err) {
    console.log('General ERROR updating iCalendar ICS file!: ', err)
    res.json({ success: false })
  }
})


// ----------------------------------------------------------------------------
// DOWNLOAD file stored in GridFS
router.get('/icsLink/:fileID', async (req, res) => {
  try {
    let gridFSbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      chuckSizeBytes: 1024,
      bucketName: 'calFile'
    })

    // Search for file in the GridFS database. When found, capture its '_id' value.
    let resFind = await CalFile.findOne({ filename: req.params.fileID })

    if (resFind) {
      // Using the '_id' value from above, convert it into 'ObjectId' format.
      let actualFileId = resFind._id

      // let read_stream = gfs.createReadStream({_id: actualFileId})
      // let imgFile = fs.createWriteStream("images/logos/logo.jpg")
      // let write_stream = read_stream.pipe(res)

      const downloadID = mongoose.Types.ObjectId(actualFileId)

      // let findCursor = gridFSbucket.find({_id: req.params.fileID})
      let findCursor = await gridFSbucket.find({ _id: downloadID })

      findCursor.toArray()
        .then((results) => {
          res.setHeader('Content-disposition', 'attachment; filename=' + req.params.fileID)
          res.setHeader('Content-type', 'text/calendar')
          gridFSbucket.openDownloadStream(downloadID)
            .pipe(res)
        })
    }
    else {
      // no file found, nothing to delete.
      res.json({ Success: false, Message: 'No such file exists.' })
    }
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error")
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
