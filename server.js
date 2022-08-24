const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = app.listen(3000);

app.use(express.static("public"))

const io = new Server(server)

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data)
    })
})