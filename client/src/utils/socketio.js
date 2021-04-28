const io = require("socket.io-client");
const socket = io("http://127.0.0.1:3000/", {
  // withCredentials: true,
  // transports: ["websocket"],
});

// client-side
socket.on("connect", () => {
  console.log(socket.id);
});


function pairNow() {
  let token = localStorage.getItem("token");
  socket.emit("new-pair", { token: token, id: socket.id });
}

export { socket, pairNow };
