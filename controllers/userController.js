const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// login
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// we create this function beacuse we need it in both login and signup
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// signup
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // .signup is the static method we added to user model
    const user = await User.signup(email, password);
    //create token
    const token = await createToken(user._id);
    // usere being the new document that was created in mogodb
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
