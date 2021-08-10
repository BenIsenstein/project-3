require("dotenv").config()
const express = require("express")
const router = express.Router()
const { Home } = require('../models/Home')

router.post('/add', async (req, res) => {
  try {
    let newHome = await new Home(req.body).save()
    res.json({ success: true, homeId: newHome._id })
  }
  catch (err) {
    console.log('error adding Home: ', err)
    res.json({ success: false })
  }
})



// get all homes for a user
router.get('/getbyuser/:id', async (req, res) => {
  try {res.json(await Home.find({ userId: req.params.id }))} // JSON array is sent back
  
  catch (err) {console.log("error getting all activatedhome for user: ", err)}
})

// get all deactivated homes for a user
router.get('/getbyuser/deactivated/:id', async (req, res) => {
try {res.json(await Home.find({ userId: req.params.id, activated: false }))} // JSON array is sent back

catch (err) {console.log("error getting all deactivated home for user: ", err)}
})

// get all activated homes for a user
router.get('/getbyuser/activated/:id', async (req, res) => {
    try {res.json(await Home.find({ userId: req.params.id, activated: true }))} // JSON array is sent back
    
    catch (err) {console.log("error getting all activatedhome for user: ", err)}
})

// get a single home
router.get('/get/:id', async (req, res) => {
    try {res.json(await Home.findOne({ _id: req.params.id }))}
    
    catch (err) {console.log("error getting single home: ", err)}   
})

// get all custom tasks for user
router.get('/getcustomtasksbyhome/:id', async (req, res) => {
  try {res.json(await Home.find({ customTask: req.params.id  }))} // JSON array is sent back
  
  catch (err) {console.log("error getting all custom tasks for home: ", err)}
})

// update and deactivate home by id
router.put('/update/:id', async (req, res) => {
    try {
      let originalHome = await Home.findOne({ _id: req.params.id })
      
      for (let key in req.body) originalHome[key] = req.body[key]
      
      await originalHome.save()
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

module.exports = router