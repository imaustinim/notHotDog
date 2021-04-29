const io = require("socket.io-client");
console.log(process.env)
const socket = io("http://localhost:5000/", {
  withCredentials: true,
  transports: ["websocket"],
});

// client-side
socket.on("connect", () => {
  pairNow();
});

function pairNow() {
  let token = localStorage.getItem("token");
  socket.emit("new-pair", { token: token, id: socket.id });
}

export { socket, pairNow };
