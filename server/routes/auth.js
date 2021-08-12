require("dotenv").config()
const express = require("express")
const router = express.Router()
const Auth = require("../models/Auth")
const bcrypt = require('bcrypt')
const passport = require('passport')

router.post('/signup', async (req, res) => {
  let { email, password, userId, confirmCode, confirmed, dateSignedUp: dateLastModified } = req.body
  password = await bcrypt.hash(password, 10)

  try {
    await new Auth({ email, password, userId, confirmCode, confirmed, dateLastModified }).save()
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

// update auth by userId
router.put('/update/:userId', async (req, res) => {
  try {
    let originalAuth = await Auth.findOne({ userId: req.params.userId }) || await Auth.findOne({ email: req.user.email })

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
  console.log()
  res.json({ isLoggedOutNow : true })
})

// Get AUTH Confirmation Code details by userID
router.get('/confirm/:userId', async (req, res) => {
  try { 
    let authObj = await Auth.findOne({ userId: req.params.userId })
    res.json({ success: true, authId: authObj._id, confirmCode: authObj.confirmCode, userId: authObj.userId })
  }
  catch(err) {
    console.log('ERROR getting AUTH confirmation info by userID:', err)
  }
})


// Handle email confirmation when get request received by user via URL
// URL example = https://taskr-1.herokuapp.com/api/auth/confirmuser?data1=userId&data2=activationcode
// URL example = http://localhost:3000/api/auth/confirmuser?data1=<userId>&data2=<activationcode>
router.get('/confirmuser', async (req, res) => {

  try {
    const queryUserId = req.query.data1
    const queryConfirmCode = req.query.data2

    // First step is to find the matching AUTH record for this user
    let authRes = await Auth.findOne({ userId: queryUserId })
    if ((authRes.confirmCode === queryConfirmCode) && (authRes.confirmed == false)) {
      console.log("Confirmation codes MATCH! Enabling the account now...")
      // Returned AUTH record contains the same confirmation code as the one provided.
      // Now update the AUTH record to set the 'confirmed' flag and enable the account.
      authRes.confirmCode = ""
      authRes.confirmed = true
      let authSaveRes = await authRes.save()

      if (authSaveRes.confirmed == true) {
        console.log("Account successfully activated, let the login begin!")

        // If everything is successful, call SendInBlue API to add user email to Contact List
      
      
        // Finished account validation, send user directly to login page
        // res.redirect('/login')
        res.redirect('http://localhost:4444/login')


      }
      else {
        console.log("Warning: Failed to update the AUTH record. Account still unconfirmed.")
        res.send("Warning: Failed to update the AUTH record. Account still unconfirmed.")
      }
    }
    else {
      console.log("Warning: Nothing to update, email already confirmed and account is active.")
      res.send("Warning: Nothing to update, email already confirmed and account is active.")
    }
  }
  catch(err) {console.log('ERROR getting AUTH confirmation info by userID:', err)}
})

module.exports = router
