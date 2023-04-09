const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// We're going to make a static method on our user model
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // can't use arrow function because we need the keyword this
  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email!");
  }
  // the bcrypt compare method will compare the password entered with the hashed password stored in db
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Incorrect Password!");
  return user;
};

module.exports = mongoose.model("User", userSchema);
