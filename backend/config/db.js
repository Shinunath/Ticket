const mongoose = require("mongoose")

let ConnectDB = async () => {
    try {
        console.log("MONGODB_URL", process.env.MONGOURL)
        await mongoose.connect(process.env.MONGOURL);
        console.log("Database connected successfully")
    } catch (error) {
        console.log("MongoDB Connection Error", error);
    }
}
module.exports = ConnectDB;


