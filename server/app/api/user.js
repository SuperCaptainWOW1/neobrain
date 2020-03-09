const api = {};

// Only for testing purposes - Remove later
api.setup = User => (req, res) => {
  const admin = new User({
    username: "admin",
    password: "admin",
    friends: []
  });

  admin.save(err => {
    if (err) throw err;
    console.log("Admin account was succesfully set up");
    res.json({ success: true });
  });
};

// Only for testing purposes - Remove later
api.index = (User, token) => (req, res) => {
  if (token) {
    User.find({}, (err, users) => {
      if (err) throw err;
      res.status(200).json(users);
    });
  } else
    return res.status(403).send({ success: false, message: "Unauthorized" });
};

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
