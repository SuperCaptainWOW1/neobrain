const PassportJWT = require("passport-jwt"),
  ExctractJWT = PassportJWT.ExtractJwt,
  Strategy = PassportJWT.Strategy,
  config = require("./index"),
  models = require("../app/setup");

module.exports = passport => {
  const User = models.User;
  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExctractJWT.fromAuthHeaderAsBearerToken()
  };
  passport.use(
    new Strategy(parameters, (payload, done) => {
      User.findOne({ id: payload.id }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else done(null, false);
      });
    })
  );
};
