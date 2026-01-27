let mongoose = require("mongoose")

let ConnectDB = async () => {
    try {
        console.log(process.env.MONGOURL)
        await mongoose.connect(process.env.MONGOURL);
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
    }
}
module.exports = ConnectDB;


