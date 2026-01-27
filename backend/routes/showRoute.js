let router = require("express").Router();
let { createShow, getShows, getShow } = require("../controllers/showController.js");
 
router.post("/createshow", createShow);
router.get("/getshow/:movieId", getShows);
// router.get("/getshow/:name", getShow);
 
module.exports = router
 