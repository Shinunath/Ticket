let express = require("express");
const dotenv = require("dotenv");
dotenv.config();
let app = express();
const cookieParser = require('cookie-parser')
const ConnectDB = require("./config/db.js")
ConnectDB()
const errorhandler = require("./middlewares/errorhandler.js");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(cors({
  origin: ["http://127.0.0.1:5500/", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"]
}));

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

let UserRoute = require("./routes/userRoutes.js");
let movieRoute = require("./routes/movieRoute.js");
let theatresRoute = require("./routes/theatresRoute.js");
let showRoute = require("./routes/showRoute.js");
let adminRoute = require("./routes/adminRoute.js");

app.use("/api/admin", adminRoute)
app.use("/api/user/", UserRoute)
app.use("/api/movie", movieRoute)
app.use("/api/theatres", theatresRoute)
app.use("/api/show", showRoute)
app.use(errorhandler)
//for serving the folder to the port  
let frontendPath = path.join(__dirname, "../frontend/dist")
app.use(express.static(frontendPath))
// for the main file
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
})




app.listen(4000, (err) => {
  console.log(err || "Server Run Port 4000")
})

