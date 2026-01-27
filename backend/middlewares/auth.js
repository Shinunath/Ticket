const { ObjectId } = require("mongodb");
let MovieUser = require("../models/movieuserModel")
const { decodetoken } = require("../utils/token");

let auth = async (req, res, next) => {
    try {
        let token = req.headers.token || null;

        if (!token) {
            return res.status(500).json({ success: false, message: "Please provide token" })
        }
        let decodedvalue = await decodetoken(token, process.env.SECRETKEY);
        let user = await MovieUser.findOne({ "_id": new ObjectId(decodedvalue.userid) })
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { auth }
