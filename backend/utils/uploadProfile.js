const multer = require("multer");
const path = require("path");

// Konfigurasi Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Directori tujuan untuk menyimpan file
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, uniqueName + "-" + extension);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Hanya file gambar yang di perbolehkan"), false);
    };
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
});

module.exports = upload;