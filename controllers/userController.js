const User = require("../models/userModel");

// login
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// signup
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // .signup is the static method we added to user model
    const user = await User.signup(email, password);
    // usere being the new document that was created in mogodb
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
