const http = require("http"),
  api = require("./config/app"),
  port = process.env.port || 3000,
  LOCAL = "0.0.0.0";

const server = http.createServer(api);

server.listen(port, LOCAL, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${port}`);
});
