const router = require('express').Router()

const userRouter = require('./user')
const calendarEntryRouter = require('./calendarEntry')
const authRouter = require('./auth')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/calendarEntry', calendarEntryRouter)

module.exports = router