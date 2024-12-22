const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Pastikan direktori uploads ada
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Saving file to:", uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const extension = path.extname(file.originalname);
        const filename = `${uniqueName}${extension}`;
        console.log("Generated filename:", filename);
        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    console.log("Received file:", file);
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
});

module.exports = upload;