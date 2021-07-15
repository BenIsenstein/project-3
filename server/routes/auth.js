require("dotenv").config()
const express = require("express")
const Auth = require("../models/Auth")
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

router.post('/signup', async (req, res) => {
  let { email, password, dateSignedUp: dateLastModified } = req.body
  password = await bcrypt.hash(password, 10)

  try {
    await new Auth({ email, password, dateLastModified }).save()
    console.log("new Auth document saved!")
    res.json({ success: true })
  } 
  catch (err) {
    console.log("error saving Auth document: ", err)
    res.sendStatus(500)
  }
})

router.post('/login', 
  passport.authenticate('local'),
  (req,res) => res.json(req.user)
)

// update calendar entry by id
router.put('/update/:id', async (req, res) => {
  try {
     let originalAuth = await Auth.findOne({ _id: req.params.id })

     for (let key in req.body) originalAuth[key] = req.body[key]
     
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

router.get('/logout', function(req, res){
  console.log("Server: Logging Out User...")
  req.logout()
  // res.sendStatus(200)
  res.json({ isLoggedOutNow : true })
})

module.exports = router
