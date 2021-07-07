const express = require('express')
const {CalendarEntry, addCalendarEntry, listAllCalendarEntries, listAllCalendarEntriesByUserId, findCalendarEntryById, deleteCalendarEntry} = require('../models/CalendarEntry')
let router = express.Router()

// add a calendar entry  
router.post('/add', async (req, res) => {
  try {
    await addCalendarEntry(new CalendarEntry(req.body))
    res.json({ success: true })
  }
  catch(err) {
    console.log("Error adding a calendar entry:", err)
    res.json({ success: false })
  }
})


// get all calendar entries 
router.get('/get', async (req, res) => {
  try { res.json({ calendarEntryList: await listAllCalendarEntries() }) }
  
  catch(err) {console.log('error getting all calendar entries:', err)}
})

// get all calendar entries for logged in user 
router.get('/getbyuser/:id', async (req, res) => {
  try { res.json({ calendarEntryList: await listAllCalendarEntriesByUserId(req.params.id) }) }
  
  catch(err) {console.log('error getting all calendar entries:', err)}
})

// get Calendar Entry by ID
router.get('/get/:id', async (req, res) => {
  try { res.json({ calendarEntry: await findCalendarEntryById(req.params.id) }) }

  catch(err) {console.log('ERROR get Calendar Entry by ID:', err)}
})


// update calendar entry by id
 router.put('/update/:id', async (req, res) => {
   try {
      let originalEntry = await findCalendarEntryById(req.params.id)

      for (let key in req.body) originalEntry[key] = req.body[key]
      
      await originalEntry.save()
      res.json({ success: true })
   }
   catch(err) {
     console.log(err)

     if (err.code === 11000) {
       res.status(409).json({message: 'Duplicate ID is not allowed'});      
     }
     else {
       res.status(500).json({message: '500 error.'})
     }
   }
 })


// Delete Calendar Entry by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    let deletedCalendarEntry = await deleteCalendarEntry(req.params.id)

    if (!deletedCalendarEntry) {
      res.status(404).json({ success: false })
    } 
    else {
      res.json({ success: true })
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
})


 //edit a task
 //router.put('/editTask/:id', async (req, res) => {
//   let taskToEdit = req.body
  
//   try {
//     let currentGarden = await Garden.findById(req.params.id)

 //    currentGarden.tasks = currentGarden.tasks.map((task) => 
 //      (task.id === taskToEdit.id) ? taskToEdit : task
 //    )
    
 //    await currentGarden.save()
 //    res.json({successMessage: 'success!'})
 //  }
 //  catch(err) {
 //    console.log(err)
 //    if (err.code === 11000) {
 //      res.status(409).json({message: 'Task ' + taskToEdit.name + ' already exists'});      
 //    }
 //    else {
  //     res.status(500).json({message: '500 error.'})
  //   }
 //  }
 //})



module.exports = router

