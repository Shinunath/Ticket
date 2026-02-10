
let bcrypt = require("bcrypt");
let { hashpassword, comparepassword } = require("../utils/hash");
const otp = require("../utils/otp");
const { generatetoken } = require("../utils/token");
const { sendEmail } = require("../utils/mail");
let UserSchemaModel = require("../models/userModel");
const otpSchemaModel = require("../models/otpModel");
const register = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, address, interest } = req.body;

        if (!name || !email || !password || !mobileNumber || !address || !interest) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details"
            });
        }

        let user = await UserSchemaModel.findOne({ email });

        if (user && user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await hashpassword(password);

        const newOtp = otp().toString();
        const expiryTime = Date.now() + 10 * 60 * 1000;

        if (user) {
            // 🔁 Re-register unverified user
            user.name = name;
            user.password = hashedPassword;
            user.mobileNumber = mobileNumber;
            user.address = address;
            user.interest = interest;
            user.isVerified = false;

            await user.save();
        } else {
            // 🆕 New user
            user = await UserSchemaModel.create({
                name,
                email,
                password: hashedPassword,
                mobileNumber,
                address,
                interest,
                isVerified: false
            });
        }

        const otpRecord = await otpSchemaModel.findOneAndUpdate(
            { user: user._id },                 // 🔍 filter (find by user)
            {                                   // ✏️ update
                otp: newOtp,
                otpExpiry: expiryTime
            },
            {
                upsert: true,                   // ➕ create if not exists
                new: true                       // 🔁 return updated/new document
            }
        )

        await sendEmail(
            email,
            "Verification OTP",
            `Your OTP is ${newOtp}`,
            `<h1>Your OTP is ${newOtp}</h1>`
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully, OTP sent",
            email
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


let resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserSchemaModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = Date.now() + 10 * 60 * 1000;

        const otpRecord = await otpSchemaModel.findOneAndUpdate(
            { user: user._id },                 // 🔍 filter (find by user)
            {                                   // ✏️ update
                otp: newOtp,
                otpExpiry: expiryTime
            },
            {
                upsert: true,                   // ➕ create if not exists
                new: true                       // 🔁 return updated/new document
            }
        )

        await sendEmail(
            email,
            "New Verification OTP",
            `Your OTP is ${newOtp}`,
            `<h2>Your OTP: ${newOtp}</h2>`
        );

        res.status(200).json({ message: "OTP resent successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP required" });
        }

        const user = await UserSchemaModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        const otpRecord = await otpSchemaModel.findOne({ user: user._id });

        if (!otpRecord) {
            return res.status(400).json({ message: "OTP not found or already used" });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (Date.now() > Number(otpRecord.otpExpiry)) {
            return res.status(400).json({ message: "OTP expired" });
        }

        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: "OTP verified successfully", success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await UserSchemaModel.findOne({ email });
        if (!user) {
            return res.status(500).json({ success: false, message: "User not found with this email" })
        }
        if (!user.isVerified) {
            return res.status(500).json({ success: false, message: "Please verify your account first" })
        }
        const passwordMatched = await comparepassword(password, user.password);

        if (!passwordMatched) {
            return res.status(500).json({ success: false, message: "please provide valid credentials" })
        }
        const token = await generatetoken({ userid: user._id }, process.env.SECRETKEY, '1d')

        res.status(200).json({
            success: true, message: "login  successfully", response: {
                user: user,
                token: token
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const profile = async (req, res) => {
    try {
        const user = await UserSchemaModel.findOne({ email });
        if (!user) {
            return res.status(500).json({ success: false, message: "User not found with this email" })
        }
        if (!user.isVerified) {
            return res.status(500).json({ success: false, message: "Please verify your account first" })
        }
        res.status(200).json({
            success: true, message: "Profile fetched successfully", response: {
                user: user,
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

let deleteuser = async (req, re) => {
    try {

        let { id } = req.params();
        await UserSchemaModel.findByIdAndDelete(id)

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { register, resendOtp, verifyOtp, login, profile }


// ORM (Object-Relational Mapping) and ODM (Object-Document Mapping) are techniques that bridge the gap between object-oriented programming languages and databases, allowing developers to interact with data using code objects instead of writing raw queries. The key difference lies in the type of database they are designed for.
// ORM is used for relational databases (SQL databases) like MySQL, PostgreSQL, and SQLite.
// ODM is used for NoSQL document databases like MongoDB and CouchDB.
