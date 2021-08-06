const express = require('express')
let router = express.Router()
const { taskInfo } = require('../models/TaskInfo')

// get all info
 router.get('/info', async (req, res) => {
  try { res.json(await taskInfo.find({}))}

  catch(err) {console.log('error getting all industry info:', err)}

})

module.exports = router