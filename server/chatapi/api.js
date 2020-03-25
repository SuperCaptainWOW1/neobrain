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
  const friendUsername = req.body.newFriend.trim();
  const senderUsername = req.body.me.trim();

  // Check if the user to add as a friend exists
  User.findOne({ username: friendUsername }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User not found."
      });
    } else if (friendUsername === senderUsername) {
      res.status(400).send({
        success: false,
        message: "It's you !"
      })
    } else {
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
        if (user.friends.filter(f => f.username === friendUsername).length !== 0) {
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

            // Update account with new friend
            User.updateOne({ username: senderUsername },{ $push: { friends: { username: friendUsername, room_id: room._id } }}, (err, user) => {
              if (err) throw err;
              if (!user) {
                res.status(500).send({
                  success: false,
                  message: "Error finding current user."
                });
              } else {
                socket.join(room._id, () => {
                  io.emit('friendAdded', { username: friendUsername, room_id: room._id });

                  io.emit('roomChanged');
                  io.emit('userJoinedRoom', friendUsername);
                })
              }
            })

            // Find and emit an updated friend
            User.findOne({ username: senderUsername }, (err, user) => {
              if (err) throw err;
              if (!user) {
                res.status(500).send({
                  success: false,
                  message: "Error finding updated user."
                });
              } else {
                io.sockets.emit("onUpdateUserData", {
                  user_id: user._id,
                  username: user.username,
                  friends: user.friends
                });
              }
            })
          })
        }
      })
    }
  })
  
}


module.exports = api;