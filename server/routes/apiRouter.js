const router = require('express').Router()

const userRouter = require('./user')
const calendarEntryRouter = require('./calendarEntry')
const authRouter = require('./auth')
const sendEmailRouter = require('./sendEmail')
const homeRouter = require('./home')
const infoRouter = require('./taskInfo')
const sibContactRouter = require('./sibContact')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/calendarEntry', calendarEntryRouter)
router.use('/sendEmail', sendEmailRouter)
router.use('/home', homeRouter)
router.use('/info', infoRouter)
router.use('/sibContact', sibContactRouter)

module.exports = router