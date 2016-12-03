/* globals module */
"use strict";

module.exports = function ({ server }) {
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
        socket.on("chat message", (msg) => {
            io.emit("chat message", msg);
        });
    });

    return io;
};