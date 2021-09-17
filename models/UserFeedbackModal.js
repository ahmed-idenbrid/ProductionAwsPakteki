const mongoose = require("mongoose");

const UserFeedbackSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const UserFeedbackModal = mongoose.model("usersFeedback", UserFeedbackSchema);

module.exports = UserFeedbackModal;
