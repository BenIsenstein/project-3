require("dotenv").config()
const express = require("express")
const Auth = require("../models/Auth")
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

router.post('/signup', async (req, res) => {
  let { email, password, dateCreation: dateLastModified } = req.body
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
  (req,res) => res.json( { user: req.user } )
)

router.get('/logout', function(req, res){
  console.log("Server: Logging Out User...")
  req.logout()
  // res.sendStatus(200)
  res.json({ isLoggedOutNow : true })
})

module.exports = router
