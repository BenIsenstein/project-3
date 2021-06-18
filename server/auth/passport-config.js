const LocalStrategy = require("passport-local").Strategy
const { findUserById, findUserByName } = require('../models/db')
const passport = require('passport')
const bcrypt = require('bcrypt')


const verifyUser = async (username, password, done) => {
    const user = await findUserByName(username)

    if (!user) {
        return done(null, false, { message: 'There is no user with that name.' })
    }
    
    try {
        if (await bcrypt.compare(password, user.password)) {
            console.log(`Pasword match for user ${user.username}`)
            return done(null, user)
        }
        else {
            return done(null, false, { message: 'Password incorrect.' })
        }
    } 
    catch(e) {
        return done(e)
    }
}

const deserialize = async (id, done) => {
    const user = await findUserById(id)
    return done(null, user)
}

passport.use(new LocalStrategy(verifyUser))
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => await deserialize(id, done))

