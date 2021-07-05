const express = require('express')
const {CalendarEntry, addCalendarEntry, listAllCalendarEntries, findCalendarEntryById, deleteCalendarEntry} = require('../models/CalendarEntry')
let router = express.Router()


// add a calendar entry  
router.post('/add', async (req, res) => {
  try {
    let body = req.body

    body.members = {}
    body.messages = [] 

    await addCalendarEntry(new CalendarEntry(body))
    res.json({ success: true })
  }
  catch(err) {
    console.log("Error adding a calendar entry:", err)
    res.json({ success: false })
  }
})


// get all calendar entries 
router.get('/get', async (req, res) => {
  console.log("Call to Fetch DB Calendar Entries!")
  try { res.json({ calendarEntryList: await listAllCalendarEntries() }) }
  
  catch(err) {console.log('error getting all calendar entries:', err)}
})


// get Calendar Entry by ID
router.get('/get/:id', async (req, res) => {
  try { res.json({ calendarEntry: await findCalendarEntryById(req.params.id) }) }

  catch(err) {console.log('ERROR get Calendar Entry by ID:', err)}
})


// update calendar entry by id
// router.put('/edit/:id', async (req, res) => {
//   let calendarEntryToUpdate = req.body
  
//   try {
//     await CalendarEntry.findByIdAndUpdate(req.params.id, calendarEntryToUpdate, {new: true});
//     res.json({message: 'success!'})
//   }
//   catch(err) {
//     console.log(err)

//     if (err.code === 11000) {
//       res.status(409).json({message: 'Calendar entry already exists'});      
//     }
//     else {
//       res.status(500).json({message: '500 error.'})
//     }
//   }
// })


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






// edit a task
// router.put('/editTask/:id', async (req, res) => {
//   let taskToEdit = req.body
  
//   try {
//     let currentGarden = await Garden.findById(req.params.id)

//     currentGarden.tasks = currentGarden.tasks.map((task) => 
//       (task.id === taskToEdit.id) ? taskToEdit : task
//     )
    
//     await currentGarden.save()
//     res.json({successMessage: 'success!'})
//   }
//   catch(err) {
//     console.log(err)
//     if (err.code === 11000) {
//       res.status(409).json({message: 'Task ' + taskToEdit.name + ' already exists'});      
//     }
//     else {
//       res.status(500).json({message: '500 error.'})
//     }
//   }
// })



module.exports = router

