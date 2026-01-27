let Movie = require("../models/movieModel")
let createMovie = async (req, res) => {
    let poster = {
        filename: req.files["poster"][0].filename,
        url: process.env.BASEURL + req.files["poster"][0].filename
    }
    let video = {
        filename: req.files["video"][0].filename,
        url: process.env.BASEURL + req.files["video"][0].filename
    }
    const languages = req.body.languages?.split(", ").map(lang => lang.trim()) || [];
    let newMovie = await Movie({ ...req.body, poster, video, languages });
    await newMovie.save();

    res.json({ success: true, message: "Movie Created Successfully", data: newMovie })
}
let getMovies = async (req, res) => {
    try {
        let movies = await Movie.find();
        res.json({ success: true, message: "Movie Get Successfully", data: movies })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

let getMovie = async (req, res) => {
    try {
        const { id } = req.params;

        console.log('id', id);
        console.log('req.params', req.params);

        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        res.status(200).json({
            success: true,
            data: movie
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


let updateMovies = async (req, res) => {
    let { id } = req.params;
    let movie = await Movie.findByIdAndUpdate(
        id,
        { "$set": { ...req.body } },
    )
    if (!updateMovies) {
        return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Blog Update Successfully", data: movie })
}
let deleteMovies = async (req, res) => {
    try {
        let { id } = req.params;
        await Movie.findByIdAndDelete(id)
        res.status(200).json({ message: "Movie Details Deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }

}
let FilterMovie = async (req, res) => {
    try {
        let { key, value } = req.params;
        let movie = await Movie.find({
            [key]: {
                "$in": value
            }
        });
        if (!movie) {
            return res.json({ success: false, message: "Movie not found" })
        }
        res.status(200).json({ success: true, message: "found", data: movie })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
module.exports = { FilterMovie, createMovie, getMovies, getMovie, updateMovies, deleteMovies }
