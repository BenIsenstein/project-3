require("dotenv").config()
const express = require("express")
const Auth = require("../models/Auth")
const router = express.Router()

router.post('/signup', async (req, res) => {
  let { email, password } = req.body
  let newAuth = new Auth({ email, password })

  try {
    await newAuth.save()
    console.log("new Auth document saved!")
  } 
  catch (err) {
    console.log("error saving Auth document: ", err)
  }
})

module.exports = router
