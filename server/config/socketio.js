var io = require("socket.io")();
const jwt = require("jsonwebtoken");
const userList = {};

io.on("connection", (socket) => {
  console.log(`${socket.id} connected.`);

  socket.on("new-pair", function (data) {
    try {
      let decoded = jwt.verify(data.token, process.env.JWT_SECRET);
      userList[decoded.user._id] = data.id;
      console.log("New Pair | Userlist: ", userList);
    } catch (err) {
      console.log(`Error: ${socket.id} token error`, data);
    }
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
    console.log("Disconnect | Userlist: ", userList);
  });
});

module.exports = io;
