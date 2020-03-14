const jwt = require("jsonwebtoken"),
  config = require("./../../config");

const api = {};

api.login = User => (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).send({
        success: false,
        message: "Authentication failed. User not found."
      });
    }
    else {      
      user.comparePassword(req.body.password, (err, matches) => {
        if (matches && !err) {
          const token = jwt.sign({ user }, config.secret);
          res.json({ success: true, message: "Token granted", token, user: {
            user_id: user._id,
            username: user.username,
            friends: user.friends
          } });
        } else {
          res.status(401).send({
            success: false,
            message: "Authentication failed. Wrong password."
          });
        }
      });
    }
  });
};

api.verify = headers => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(" ");
    if (split.length === 2) return split[1];
    else return null;
  } else return null;
};

module.exports = api;
