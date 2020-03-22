const api = {};

api.signup = User => (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      message: "Please, pass a username and password."
    });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      friends: []
    });
    newUser.save(err => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Username already exists." });
      }
      res.json({ success: true, message: "Account created successfully" });
    });
  }
};

module.exports = api;
