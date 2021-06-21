const express = require('express')
const {CalendarEntry, listAllCalendarEntries, addCalendarEntry, deleteCalendarEntry} = require('../models/db')
let router = express.Router()


// add a calendar entry  
router.post('/add', async (req, res) => {
  try {
    let body = req.body

    body.members = {}
    body.messages = [] 

    await addCalendarEntry(new CalendarEntry(body))
    res.json({successMessage: 'Added!'})
  }
  catch(err) {
    console.log("Error adding a garden:", err)
  }
})

// update calendar entry by id
// router.put('/edit/:id', async (req, res) => {
//   let gardenToUpdate = req.body
  
//   try {
//     await Garden.findByIdAndUpdate(req.params.id, gardenToUpdate, {new: true});
//     res.json({message: 'success!'})
//   }
//   catch(err) {
//     console.log(err)

//     if (err.code === 11000) {
//       res.status(409).json({message: 'Garden ' + gardenToUpdate.name + ' already exists'});      
//     }
//     else {
//       res.status(500).json({message: '500 error.'})
//     }
//   }
// })

// get all calendar entries 
router.get('/get', async (req, res) => {
  try { res.json({ calendarEntryList: await listAllCalendarEntries() }) }
  
  catch(err) {console.log('error getting all gardens:', err)}
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

// delete task
// router.delete('/deleteTask/:id', async (req, res)  => {
//   try {
//     let currentGarden = await Garden.findById(req.params.id)

//     currentGarden.tasks = currentGarden.tasks.filter(task => task.id !== req.body.taskId)

//     await currentGarden.save()
//     res.json({successMessage: 'Delete was succesful!'})
//   }
//   catch(err) {
//     console.log(err)

//     if (err.code === 11000) {
//       res.status(409).json({message: 'Task ' + taskToUpdate.name + ' already deleted'});      
//     }
//     else {
//       res.status(500).json({message: '500 error.'})
//     }
//   }
// })

// get Calendar Entry by ID
// router.get('/get/:id', async (req, res) => {
//   try { res.json({ calendarEntry: await findCalendarEntryById(req.params.id) }) }

//   catch(err) {console.log('ERROR get Calendar Entry by ID:', err)}
// })

module.exports = router

