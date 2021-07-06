require("dotenv").config()
const express = require("express")
const Auth = require("../models/Auth")
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/signup', async (req, res) => {
  let { email, password, dateSignedUp } = req.body
  password = await bcrypt.hash(password, 10)

  try {
    await new Auth({ email, password, dateSignedUp }).save()
    console.log("new Auth document saved!")
    res.json({ success: true })
  } 
  catch (err) {
    console.log("error saving Auth document: ", err)
    res.sendStatus(500)
  }
})

module.exports = router
