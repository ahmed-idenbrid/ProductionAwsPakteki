const mongoose = require("mongoose");

const AllNewsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: String,
  channel: String,
  image: {
    type: String,
  },
  permalink: {
    type: String,
    required: true,
  },
  category: String,
  fetching_date: String,
  registered_views: Array,
  no_of_comments: Number,
  no_of_nonregistered_views: Number,
  no_of_registered_views: Number,
  rating: String,
  language: String,
  created_at: String,
  updated_at: String,
  comments: Array,
  likes: Array,
});

const AllNewsModal = mongoose.model("newsAll", AllNewsSchema);

module.exports = AllNewsModal;
