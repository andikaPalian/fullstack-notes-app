const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/user.controller");
const validateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", validateToken, getUser);

module.exports = router;