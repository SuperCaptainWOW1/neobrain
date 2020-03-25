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

api.getUserData = User => (req, res) => {
  const userId = req.query.id;
  
  User.findById(userId, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(500).json({
        success: false,
        message: "Can not find a user to send user data"
      })
    } else {
      res.status(200).json({
        username: user.username,
        friends: user.friends
      })
    }
  })
}

module.exports = api;
