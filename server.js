const express = require("express");
const app = express();
const path = require("path");
const socket = require("socket.io");

app.use("/static", express.static(path.join(__dirname, "client")));

let messages = [];
let users = [];

app.get("/client", (req, res) =>
  res.sendfile(__dirname + "/client/index.html")
);

const server = app.listen(8000, () => {
  console.log("Server running on port 8000");
});
const io = socket(server);

io.on("connection", socket => {
  console.log("New client! Its id – " + socket.id);

  socket.on("logged", userInfo => {
    users.push({ name: userInfo, id: socket.id });
    socket.broadcast.emit("newUser", userInfo);
  });
  socket.on("message", message => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("Oh, socket " + socket.id + " has left");
    if (users.length > 0) {
      const user = users.find(user => user.id == socket.id).name;
      socket.broadcast.emit("removeUser", user);
      users.splice(user, 1);
    }
  });

  console.log("I've added a listener on message event \n");
});
