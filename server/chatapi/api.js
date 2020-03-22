const api = {};

api.createChatRoom = (ChatRoom, User) => (req, res) => {
  // Create chat room document
  const newChatRoom = new ChatRoom({
    messages: []
  })

  newChatRoom.save((err, room) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Could not create a chat room" });
    }
    roomId = room._id;
    console.log(roomId)
  })
  res.end();
}

api.addFriend = (ChatRoom, User, socket, io) => (req, res) => {
  const friendUsername = req.body.newFriend;
  const senderUsername = req.body.me;

  // Check if the user to add as a friend exists
  User.findOne({ username: friendUsername }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User not found."
      });
    }
  })

  // Check if user already added this user to your friends list
  User.findOne({ username: senderUsername }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(500).send({
        success: false,
        message: "Internal server error."
      });
    }
    // If user's friends array contains object with given name return an error
    if (user.friends.filter(f => f.name === friendUsername).length !== 0) {
      res.status(400).send({
        success: false,
        message: "You've already added this user to your friends list."
      })
    } else {
      // Create chat room document
      const newChatRoom = new ChatRoom({
        messages: []
      })

      newChatRoom.save((err, room) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Could not create a chat room" });
        }
        console.log(room._id)

        // Find and update account with new friend
        User.updateOne({ username: senderUsername },{ $push: { friends: { name: friendUsername, room_id: room._id } }}, (err, user) => {
          if (err) throw err;
          if (!user) {
            res.status(500).send({
              success: false,
              message: "Error finding current user."
            });
          } else {
            socket.join(room._id, () => {
              io.to(room._id).emit('roomChanged');
              io.to(room._id).emit('userJoinedRoom', friendUsername);
            })
          }
        })
      })
    }
  })
}

module.exports = api;