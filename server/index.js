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

  socket.send('hey');

  // io.of()

  // socket.join(socket.id)

  // @TODO: Remake it into socket version with emit and on 
  app.post('/chat/addfriend', api.addFriend(models.ChatRoom, models.User, socket, io));
  app.get('/chat/room', api.getChatRoom(models.ChatRoom));

  socket.on('chat_message', api.sendChatMessage(models.ChatRoom, socket, io))
});

// Chat \\
server.listen(port, LOCAL, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${port}`);
});
