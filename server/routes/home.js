require("dotenv").config()
const express = require("express")
const router = express.Router()
const { Home } = require('../models/Home')

router.post('/add', async (req, res) => {
    try {
        await new Home(req.body).save()
        res.json({ success: true })
    }
    catch (err) {
        console.log('error adding Home: ', err)
    }
})

// get all homes for a user
router.get('/getbyuser/:id', async (req, res) => {
    try {res.json(await Home.find({ userId: req.params.id }))} // JSON array is sent back
    
    catch (err) {console.log("error getting all home for user: ", err)}
})

// get a single home
router.get('/get/:id', async (req, res) => {
    try {res.json(await Home.findOne({ _id: req.params.id }))}
    
    catch (err) {console.log("error getting single home: ", err)}   
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