require("dotenv").config()
const mongoose = require('mongoose');

/* Moved credentials to .env */

// const mongoUser = 'dbReadOnlyUser';
// const mongoPasswd = 'jelly1234';
// const mongoDBName = 'MERN-STARTER-DB';
// const mongoServer = 'cluster0.vvqav.mongodb.net';
// const url =
//   `mongodb+srv://${mongoUser}:${mongoPasswd}` +
//   `@${mongoServer}/${mongoDBName}?retryWrites=true&w=majority`;

// const localMongoUrl = "mongodb://localhost:27017/c6Superheroes"

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', (_) =>console.log('MongoDB is now connected:', process.env.MONGODB_URL));
db.on('error', (err) => console.error('MongoDB connection error!', err));

// User model and functions
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true }, 
    password: String,
    email: String,
    dateSignedUp: String
})
  
userSchema.methods.validPassword = function (pwd) {
  return this.password === pwd
}

const User = mongoose.model("User", userSchema)

const findUserByName = async (name) => {
  let result = await User.findOne({ username: name })
  return result
}

const findUserById = async (id) => {
  let result = await User.findOne({ _id: id })
  return result
}

const addUser = async (newUser) => {
  let result = await newUser.save()
  return result.username + " succesfully added to database!"
}


// General db functions

const closeDb = async () => await db.close({ force: true })

const searchByFragment = async (model, attribute, fragment) => await model.find({ [attribute]: new RegExp(`.*${fragment}.*`, "i") })
  

module.exports = {
    User,
    findUserById,
    findUserByName,
    addUser,
    closeDb,
    searchByFragment
}