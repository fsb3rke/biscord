const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = app.listen(3000);

app.use(express.static("public"))

const io = new Server(server)

io.on("connection", (socket) => {
    const ip = socket.handshake.headers['x-forwarded-for'] || socket.conn.remoteAddress.split(":")[3];
    console.log(socket.id, ip, getTime());
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data)
    })

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data)
    })
})

function getTime() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toLocaleString(); // "Sat, 13 Jun 2020 18:30:00 GMT"
}