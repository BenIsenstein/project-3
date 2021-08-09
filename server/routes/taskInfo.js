const express = require('express')
let router = express.Router()
const { TaskInfo } = require('../models/TaskInfo')

// get all info
 router.get('/', async (req, res) => {
  try { res.json(await TaskInfo.find({}))
}

  catch(err) {console.log('error getting all industry info:', err)}

})

module.exports = router