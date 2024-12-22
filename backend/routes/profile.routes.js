const express = require("express");
const upload = require("../utils/uploadProfile");
const { updateProfile, getProfile } = require("../controllers/profile.controller");
const validateToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get profile endpoint
router.get("/profile/:id", validateToken, getProfile);

// Update profile endpoint
router.put(
    "/profile/:id", 
    validateToken,
    upload.single("profileImage"),
    updateProfile
);

module.exports = router;