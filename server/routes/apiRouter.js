const router = require('express').Router()

const userRouter = require('./user')
const calendarEntryRouter = require('./calendarEntry')

router.use('/user', userRouter)
router.use('/calendarEntry', calendarEntryRouter)

module.exports = router