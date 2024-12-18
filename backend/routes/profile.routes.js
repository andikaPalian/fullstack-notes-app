const express = require("express");
const upload = require("../utils/uploadProfile");
const { updateProfile } = require("../controllers/profile.controller");
const router = express.Router();

router.put("/:id", upload.single("profileImage", updateProfile));

module.exports = router;