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

module.exports = router