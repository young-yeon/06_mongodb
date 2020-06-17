
const mongoose = require("mongoose")

// define Schema
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    director: {
        type: String,
        trim: true,
        required: true,
    },
    year: {
        type: String,
        trim: true,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

// create model - model(name:str, schema?:mongoose.Schema, collection?:String)
// Collection name + 's'
const Movie = mongoose.model("movie", MovieSchema, "movie")
module.exports = Movie
