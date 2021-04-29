const io = require("socket.io-client");
let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`;
const socket = io(url, {
  withCredentials: true,
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
