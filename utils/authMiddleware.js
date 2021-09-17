const jwt = require("jsonwebtoken");
const UserRegisterModal = require("../models/userRegisterModal");

module.exports = async function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    res.sendStatus(403);
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const verifiedUser = await UserRegisterModal.findById(verified.id);
    req.user = verifiedUser;
    next();
  } catch (error) {
    res.send({ Message: "Invalid Token Or Token Expired" });
  }
};
