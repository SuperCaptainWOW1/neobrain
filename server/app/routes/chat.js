const models = require("../setup");
const socket = require("../../index");

module.exports = app => {
  console.log(app.api);
  const api = app.api.chat;
  app.post('/chatroom', api.createChatRoom(models.ChatRoom, models.User, socket))
}