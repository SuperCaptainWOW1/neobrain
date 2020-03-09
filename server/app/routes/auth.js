const models = require("../setup");

module.exports = app => {
  const api = app.api.auth;
  app.get("/", (req, res) => res.send("Neobrain API"));
  app.post("/api/auth", api.login(models.User));
};
