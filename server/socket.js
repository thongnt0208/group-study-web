// socket.io
const express = require('express'),
    http = require('http');
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

const PORT_SOCKET = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
        socket.leave(roomId);
    });
});

server.listen(PORT_SOCKET, () => {
    console.log(`Listening on port ${PORT_SOCKET}`);
});