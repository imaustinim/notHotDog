const express = require("express");
const cors = require("cors");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
// Config
dotenv.config({ path: ".env" });
const port = process.env.PORT || 5000;

require("./config/database")();

app.use(logger("dev"));
app.use(express.json());
app.use(
  session({
    secret: "nothotdog",
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore({
      collection: "sessions",
      uri: process.env.DATABASE_URL,
      databaseName: "MyDatabase",
    }),
  })
);

// Build
app.use(favicon(path.join(__dirname, "..", "client", "build", "hotdog.svg")));
app.use(express.static(path.join(__dirname, "..", "client", "build")));

let server = app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
var host = server.address();

const options = {
  cors: {
    origin: process.env.URL,
    // origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
};
let io = require("./config/socketio");

io.attach(server, options);

// Routers
const apiRouter = require("./routes/api.routes");
app.use("/api", apiRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

module.exports = app;