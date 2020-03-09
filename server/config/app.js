const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  consign = require("consign"),
  cors = require("cors"),
  passport = require("passport"),
  passportConfig = require("./passport")(passport),
  jwt = require("jsonwebtoken"),
  config = require("./index.js"),
  database = require("./database")(mongoose, config);

app.use(express.static("."));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());

app.set("secret", config.secret);
consign({ cwd: "app" })
  .include("setup")
  .then("api")
  .then("routes")
  .into(app);

module.exports = app;
