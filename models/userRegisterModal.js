const mongoose = require("mongoose");

const UserRegisterSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  profilePicture: String,
});

const UserRegisterModal = mongoose.model("users", UserRegisterSchema);

module.exports = UserRegisterModal;
