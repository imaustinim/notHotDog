var io = require("socket.io")();
const jwt = require("jsonwebtoken");
const userList = {};

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("new-pair", function (data) {
    let decoded = jwt.verify(data.token, process.env.JWT_SECRET);
    userList[decoded.user._id] = data.id;
  });
  socket.on("business-redeem", function (data) {
    let userSocketId = userList[data.id];
    io.to(userSocketId).emit("client-redeem", { name: data.name });
    console.log("business-redeem", data);
  });
  socket.on("disconnect", function (data) {
    for (const [key, val] of Object.entries(userList)) {
      if (val == socket.id) delete userList.key;
    }
  });
});

module.exports = io;
