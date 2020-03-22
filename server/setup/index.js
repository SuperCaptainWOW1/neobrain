const mongoose = require("mongoose"),
  UserModel = require("../models/user"),
  ChatRoomModel = require("../models/chatRoom");

const models = {
  User: mongoose.model("User"),
  ChatRoom: mongoose.model("ChatRoom")
};

module.exports = models;
