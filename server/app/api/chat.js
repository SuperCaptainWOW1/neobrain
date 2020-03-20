const api = {};

api.createChatRoom = (ChatRoom, User, socket) => (req, res) => {
  // Create chat room document
  const newChatRoom = new ChatRoom({
    messages: []
  })

  newChatRoom.save((err, room) => {
    console.log(room);
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Could not create a chat room" });
    }
  })
  // Add friend name and chat id to user document


  // Connect user to the chat room

  // socket.join('room 237', () => {
  //   io.to('room 237').emit('userJoinedRoom', req.body.username); // broadcast to everyone in the room
  // });
  res.end();
}

module.exports = api;