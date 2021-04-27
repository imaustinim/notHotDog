var io = require("socket.io")();

/* socket io on connection event listener */
io.on("connection", function (socket) {
  socket.on("connect", function (data) {
    io.emit("connect", data);
    console.log("connect");
  });

  socket.on("disconnect", function (data) {
    console.log("disconnect");
  });
});

module.exports = io;
