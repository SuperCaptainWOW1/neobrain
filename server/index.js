const http = require("http"),
  app = require("./config/app"),
  port = process.env.port || 3000,
  LOCAL = "0.0.0.0",
  socketIO = require('socket.io');
  
const server = http.createServer(app);
const io = socketIO(server);

const socket = io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
});

server.listen(port, LOCAL, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${port}`);
});

module.exports = socket;