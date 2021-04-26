var io = require("socket.io")();


io.on("connection", function (socket) {
  socket.on("user-connect", function (data) {
    io.emit("user-connect", data);
  });

  socket.on("business-connect", function (data) {
    io.emit("business-connect", data);
  });

  socket.on("disconnect", function (data) {
    io.emit("disconnect", data);
  });
});

module.exports = io;
