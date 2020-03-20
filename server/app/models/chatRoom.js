const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now(),
    required: true
  },
  dateModified: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

const roomSchema = mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  messages: [messageSchema]
}) 

mongoose.model("ChatRoom", roomSchema);