const express = require('express')
const { EmailBody, sendUserEmail, sendGroupEmail } = require('../models/SendEmail')
let router = express.Router()

// send transactional email to user  
router.post('/user', async (req, res, next) => {
  try {
    // await sendUserEmail(new EmailBody(req.body))
    // await sendUserEmail()
    console.log("Congrats, you reached the EMAIL API")
    await sendUserEmail(req.body)
    res.json({ success: true })
  }
  catch (err) {
    console.log("Error sending USER email:", err)
    res.json({ success: false })
  }
})

// send marketing email to GROUP of users  
// router.post('/group', async (req, res) => {
//   try {
//     await sendGroupEmail(new EmailBody(req.body))
//     res.json({ success: true })
//   }
//   catch (err) {
//     console.log("Error sending GROUP email:", err)
//     res.json({ success: false })
//   }
// })

module.exports = router