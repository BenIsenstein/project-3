require('dotenv').config()
const express = require("express")
const passport = require("passport")
const router = express.Router()
const { User } = require('../models/User')
const Auth = require("../models/Auth")


// ----------------------------------- SIGNUP ---------------------------------

router.post("/signup", async (req, res) => {
  let { password, ...newUser } = req.body

  try {
    await new User(newUser).save()
    console.log("new User document saved!")
    res.json({ success: true })
  } 
  catch (err) {
    //delete the Auth document that was created before the User creation failed
    await Auth.findOneAndDelete({ email: newUser.email })
    console.log("error saving User document: ", err)
    res.sendStatus(500)
  }
})

// ----------------------------------- LOGIN -----------------------------------

router.post("/login",
  // check if someone is already logged in
  (req, res, next) => {
    // if someone is already logged in, send back {isAlreadyLoggedIn: true}
    if (req.isAuthenticated()) {
      res.json({ isAlreadyLoggedIn: true })
    } 
    // move to authentication middleware if no one is logged in
    else {
      console.log("about to log in")
      next() 
    }
  },
  // authentication middleware. sends a status code 401 if auth fails
  passport.authenticate("local"),
  // if authentication passes, the next function has access to req.user
  (req, res) => res.json(req.user)
)

// ----------------------------------- LOGOUT -----------------------------------

router.get("/logout", 
  function (req, res) {
    let username = req.user?.username || 'nobody'
    let logoutResult = undefined
    let isLoggedOutNow = undefined

    console.log("is someone currently logged in? ", req.isAuthenticated())

    // logout if someone was logged in, log to console if nobody was logged in
    if (req.isAuthenticated()) {
      req.logOut() 
    }
    else {
      console.log("/user/logout was fetched, but no one was logged in")
    }

    // set the value of logoutResult to be logged
    if (req.isAuthenticated()) {
      logoutResult = `user ${username} is logged in still :(`
    }
    else {
      logoutResult = `${username} is logged out!`
    }  

    console.log("logout result: ", logoutResult)

    // send response with boolean of logout success
    isLoggedOutNow = !req.isAuthenticated()
    res.json({isLoggedOutNow})
  }
)

// ------------------------------------ UPDATE USER---------------------------------

// Update a user by id
router.put('/update/:id', 
  async (req, res) => {
    try {
      let originalUser = await User.findOne({ _id: req.params.id })
    
      for (let key in req.body) originalUser[key] = req.body[key]

      await originalUser.save()
      res.json({ success: true })
    }
    catch(err) {
      console.log(err)
      if (err.code === 11000) {
        res.status(409).send('User ' + userToUpdate.name + ' already exists');      
      }
      else {
        res.status(500).json({ success: false })
      }
    }
  }
)

// ----------------------------------- GET LOGGED IN USER -----------------------------------

router.get("/getloggedinuser", (req, res) => res.json(req.user || {}))

module.exports = router
