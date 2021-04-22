const express = require('express');
const cors = require("cors");
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const dotenv = require("dotenv");
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();

// Config
dotenv.config({ path: "./config/config.env"});
const port = process.env.PORT || 5000;

require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(session({
  secret: 'nothotdog',
  resave: false,
  saveUninitialized: false,
  store: MongoDBStore({
      collection: "sessions",
      uri: process.env.DATABASE_URL,
      databaseName: "MyDatabase"
  })
}))

// Build
app.use(favicon(path.join(__dirname, "..", "client", 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, "..", "client", 'build')));

// Routers
const apiRouter = require("./routes/api.routes");
app.use("/api", apiRouter);

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, "..", "client", 'build', 'index.html'));
});

module.exports = app