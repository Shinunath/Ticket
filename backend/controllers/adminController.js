let bcrypt = require("bcrypt");
let { hashpassword, comparepassword } = require("../utils/hash");
const { generatetoken } = require("../utils/token");
let Admin = require("../models/adminModel.js")
 
let register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(500).json({ success: false, message: "Please provide all the details" })
        }
        let hashed = await hashpassword(password)
        let newAdmin = await Admin({
            name,
            email,
            password: hashed,
            createdAt: Date.now()
        });
        await newAdmin.save()
        res.status(201).json({ success: true, message: "Admin Registered successfully", data: newAdmin })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
 
let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(500).json({ success: false, message: "admin not found" })
        }
        let ismatch = await comparepassword(password, admin.password);
        if (!ismatch) {
            return res.status(500).json({ success: false, message: "please provide valid credentials" })
        }
        let token = await generatetoken({ adminId: admin._id }, process.env.SECRETKEY, '1d')
 
        res
            .cookie("token", token,
                {
                    httpOnly: true,
                    sameSite: "Strict",
                    secure: true,
                    expires: new Date(Date.now() + 24 * 3600000),//cookie will remove after 24 hours from now
                }
            )
            .status(200)
            .json({ success: true, message: "login  successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
let profile = (req, res) => {
    try {
        if (!req.admin) {
            return res.status(500).json({ success: false, message: "not found" })
        }
        res.json({ success: true, message: "Admin found", data: req.admin })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
let logout = async (req, res) => {
    try {
        res
            .clearCookie("token",
                {
                    httpOnly: true,
                    sameSite: "Strict",
                    secure: true,
                    expires: new Date(Date.now() + 24 * 3600000),//cookie will remove after 24 hours from now
                }
            )
            .status(200)
            .json({ success: true, message: "Logout  successfully" })
    } catch (error) {
 
    }
}
 
module.exports = { logout, register, login, profile }
 
 