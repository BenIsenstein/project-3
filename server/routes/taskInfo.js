const express = require('express')
let router = express.Router()
const { TaskInfo } = require('../models/TaskInfo')

// get all info
 router.get('/', async (req, res) => {
  console.log("Reached api route")
  try { res.json(await TaskInfo.find({}))
  console.log("Await TaskInfo", await TaskInfo.find({}))
  console.log("After try in api route")
}

  catch(err) {console.log('error getting all industry info:', err)}

})

module.exports = router