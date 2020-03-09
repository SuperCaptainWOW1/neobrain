const mongoose = require("mongoose"),
  UserModel = require("../models/user");
// BudgetModel = require("../models/budget"),
// ClientModel = require("../models/client");

const models = {
  User: mongoose.model("User")
  // Budget: mongoose.model("Budget"),
  // Client: mongoose.model("Client")
};

module.exports = models;
