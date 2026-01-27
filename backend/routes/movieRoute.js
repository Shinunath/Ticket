let router = require("express").Router();
let { createMovie, getMovies, getMovie, updateMovies, deleteMovies, FilterMovie } = require("../controllers/movieController.js");
const upload = require("../middlewares/upload.js");

// router.post("/createmovie", upload.array("poster",10), createMovie);
// router.post("/createmovie",upload.single("poster"), createMovie);
router.post("/createmovie", upload.fields([{ name: "poster", maxCount: 1 }, { name: "video", maxCount: 1 }]), createMovie);
router.get("/getmovies", getMovies);
router.get("/getmovie/:id", getMovie);
router.put("/updatemovie/:id", updateMovies);
router.delete("/deletemovie/:id", deleteMovies);
router.get("/filtermovie/:key/:value", FilterMovie)

module.exports = router
