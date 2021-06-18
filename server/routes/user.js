require('dotenv').config()
const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const router = express.Router()

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
  (req, res) => {
    res.json({ user: req.user })
  }
)
