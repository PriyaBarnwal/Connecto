const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user should have a name"]
  },
  email: {
    type: String,
    required: [true, "user should have email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "please enter the password"],
    minLength: 8,
    select: false
  },
  photo: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

let User = mongoose.model('users', UserSchema)
module.exports = User