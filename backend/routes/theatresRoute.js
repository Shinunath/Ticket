let router = require("express").Router();
let { createTheatre, filterTheatre,getTheatre,updateTheatre,deleteTheatre } = require("../controllers/theatreController.js");
const upload = require("../middlewares/upload.js");

router.post("/createtheatre", upload.fields([{ name: "image", maxCount: 1 }]), createTheatre);
router.get("/gettheatres", getTheatre);
router.put("/updatetheatre/:id", updateTheatre);
router.delete("/deletetheatre/:id", deleteTheatre);
router.get("/filtertheatre/:id", filterTheatre);

module.exports = router
