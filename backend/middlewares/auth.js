const { ObjectId } = require("mongodb");
let Admin = require("../models/adminModel")
let MovieUser = require("../models/userModel")
const { decodetoken } = require("../utils/token");
 
let authAdmin = async (req, res, next) => {
    try {
        let token = req.cookies.token || null;
 
        if (!token) {
            return res.status(500).json({ success: false, message: "Please provide token" })
        }
        let decodedvalue = await decodetoken(token, process.env.SECRETKEY);
        console.log(decodedvalue)
        let admin = await Admin.findOne({ "_id": new ObjectId(decodedvalue.adminId) })
        req.admin = admin;
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
let auth = async (req, res, next) => {
    try {
        let token = req.headers.token || null;
        // let token = req.headers.authorization.split(" ")[1] || null
 
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
 
module.exports = { auth, authAdmin }
 