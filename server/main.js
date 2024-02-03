const fs = require("fs");
const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const chatStorage = [];

io.on("connection", (client) => {
  console.log("connected");
  client.on('message', (ev) => {
    io.emit("message", ev);
    console.log(ev);
  })
  client.on("disconnect", () => {
    console.log("disconnected");
  });
});
server.listen(3005, () => {
  console.log("ws://localhost:3005");
});
