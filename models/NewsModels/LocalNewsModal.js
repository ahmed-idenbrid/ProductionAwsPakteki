const { ObjectId } = require("mongoose");
const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  LocalNewsSchema = new Schema({
    id:ObjectId,
    title: {
      type:String,
      required:true
    },
    description: {
      type:String,
      required:true
    },
    date:String,
    channel:String,
    image:{
      type:String,
      required:true
    },
    permalink:{
      type:String,
      required:true
    },
    category:String,
    fetching_date:String,
    no_of_views:String,
    no_of_likes:String,
    no_of_dislikes:String,
    no_of_comments:String,
    rating:String,
    language:String,
    created_at:String,
    updated_at:String,
  });

module.exports = mongoose.model("localnews", LocalNewsSchema);
