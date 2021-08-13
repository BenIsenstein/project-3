const express = require('express')
const { addContact, deleteContact } = require('../models/SibContact')
let router = express.Router()

// Create new CONTACT in SendInBlue  
router.post('/add', async (req, res, next) => {
  try {
    await addContact(req.body)
    res.json({ success: true })
  }
  catch (err) {
    console.log("Error creating new contact in SiB:", err)
    res.json({ success: false }) 
  }
})

// Delete Contact in SendInBlue  
router.post('/delete', async (req, res, next) => {
  try {
    await deleteContact(req.body)
    res.json({ success: true })
  }
  catch (err) {
    console.log("Error deleting contact in SiB:", err)
    res.json({ success: false }) 
  }
})

module.exports = router