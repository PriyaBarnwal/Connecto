const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  company: {
    type: String,
    required: [true, "user should have a name"]
  },
  location: {
    type: String,
    //required: [true, "user should have email"]
  },
  role: {
    type: String,
    required: [true, "please enter the role"]
  },
  skills: {
    type:[String],
    required: true
  },
  githubusername : {
    type: String
  },
  hobbies: {
    type:[String],
    required: true
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      iscurrent: {
        type: String,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      subject: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      iscurrent: {
        type: String,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  bio: {
    type: String,
    required: [true, "user should have a bio"]
  },
  social: {
    linkedIn: String,
    youtube: String,
    facebook: String,
    twitter: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

let Profile = mongoose.model('profile', ProfileSchema)
module.exports = Profile