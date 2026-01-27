let mongoose = require("mongoose");
let movieSchema = new mongoose.Schema({
    name: { type: String },
    releasedate: { type: Date },
    length: { type: Number },
    genre: [],
    languages: [{
        type: String,
        trim: true
    }],
    category: [],
    released: Boolean,
    castNames: [],
    description: String,
    poster: { filename: String, url: String, _id: false },
    video: { filename: String, url: String, _id: false },
    theaters: [],
    encodeName: String
})
let movieModel = mongoose.model("movies", movieSchema);
module.exports = movieModel;


