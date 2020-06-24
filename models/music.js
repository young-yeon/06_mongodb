const mongoose = require("mongoose");

// define Schema
const MusicSchema = new mongoose.Schema({
  singer: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// create model - model(name:str, schema?:mongoose.Schema, collection?:String)
// Collection name + 's'
const Music = mongoose.model("music", MusicSchema, "music");
module.exports = Music;
