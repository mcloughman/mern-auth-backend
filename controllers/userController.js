const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// we create this function beacuse we need it in both login and signup
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // .signup is the static method we added to user model
    const user = await User.login(email, password);
    //create token
    console.log(user._id);
    const token = createToken(user._id);
    // usere being the new document that was created in mogodb
    res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // .signup is the static method we added to user model
    const user = await User.signup(email, password);
    //create token
    const token = createToken(user._id);
    // usere being the new document that was created in mogodb
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
