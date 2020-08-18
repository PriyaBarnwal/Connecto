const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: [true, 'Title of post is required']
  },
  text: {
    type: String,
    required: [true, 'Content is required']
  },
  name: {
    type: String,
    required: [true, 'name is required']
  },
  profilephoto: {
    type: String
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: [true, 'Content is required']
      },
      name: {
        type: String,
        required: [true, 'name is required']
      },
      profilephoto: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
})

let Post = mongoose.model('posts', PostSchema)
module.exports = Post