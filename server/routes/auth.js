require("dotenv").config()
const express = require("express")
const Auth = require("../models/Auth")
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

router.post('/signup', async (req, res) => {
  let { email, password, userId, dateSignedUp: dateLastModified } = req.body
  password = await bcrypt.hash(password, 10)

  try {
    await new Auth({ email, password, userId, dateLastModified }).save()
    res.json({ success: true })
  } 
  catch (err) {
    //delete the Auth document that was created before the User creation failed
    await User.findOneAndDelete({ _id: userId })
    console.log("error saving Auth document: ", err)
    res.sendStatus(500)
  }
})

router.post('/login', 
  passport.authenticate('local'),
  (req,res) => res.json(req.user)
)

router.put('/change-password',
  passport.authenticate('local'),
  async (req, res) => {
    let body = req.body
    let originalAuth = await Auth.findOne({ userId: body.userid })

    originalAuth.password = await bcrypt.hash(body.newPassword, 10)

    await originalAuth.save()
    res.json({ success: true })
  }
)

// update calendar entry by id
router.put('/update/:userId', async (req, res) => {
  try {
    let originalAuth = await Auth.findOne({ userId: req.params.userId })

    for (let key in req.body) originalAuth[key] = req.body[key]
     
    await originalAuth.save()
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

router.get('/logout', (req, res) => {
  console.log("Server: Logging Out User...")
  req.logout()
  res.json({ isLoggedOutNow : true })
})

module.exports = router
