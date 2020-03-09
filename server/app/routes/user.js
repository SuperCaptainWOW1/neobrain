const passport = require("passport"),
  config = require("../../config"),
  models = require("../setup");

module.exports = app => {
  const api = app.api.user;
  app.post("/api/setup", api.setup(models.User));
  app.get(
    "/api/users",
    passport.authenticate("jwt", config.session),
    api.index(models.User, app.get("secret"))
  );
  app.post("/api/signup", api.signup(models.User));
};
