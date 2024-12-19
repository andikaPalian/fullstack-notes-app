const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        };
        const availableUser = await User.findOne({email});
        if (availableUser) {
            return res.status(400).json({message: "User already exists"});
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({message: "User registered successfully", data: user});
    } catch (error) {
        console.error("Error in registerUser controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        };
        const user = await User.findOne({email});
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                id: user._id,
            }, process.env.ACCESS_TOKEN, {expiresIn: "1d"});
            user.password = undefined;
            res.status(200).json({message: "User login successfully", data: {user, accessToken}});
        } else {
            return res.status(400).json({message:"Invalid Email or Password"});
        };
    } catch (error) {
        console.error("Error in loginUser controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "Am unexpected error occurred",
        });
    };
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json({message: "Success get user info", data: user});
    } catch (error) {
        console.error("Error in getUser controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = {registerUser, loginUser, getUser};