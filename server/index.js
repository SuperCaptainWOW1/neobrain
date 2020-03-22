const http = require("http"),
  app = require("./config/app"),
  port = process.env.port || 3000,
  LOCAL = "0.0.0.0",
  socketIO = require('socket.io');

const server = http.createServer(app);
  
// Chat
const models = require('./setup');
const api = require('./chatapi/api');
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  app.post('/chat/addfriend', api.addFriend(models.ChatRoom, models.User, socket, io))
  app.post('/chat/createroom', api.createChatRoom(models.ChatRoom, models.User))
});

// Chat \\
server.listen(port, LOCAL, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${port}`);
});
