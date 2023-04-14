const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // console.log(req.headers.authorization);
  // verify authorization
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  // what we should get back is something like this "Bearer hiuyiuy43iuy.jhfhskfjhuyio873.873iophwe88345"
  const token = authorization.split(" ")[1];
  console.log(token);

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    console.log(_id);
    // the select part will just give us back that property. we only need the id
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
module.exports = requireAuth;
