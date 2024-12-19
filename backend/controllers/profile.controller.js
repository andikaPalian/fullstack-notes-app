const Profile = require("../models/profile.models");

const updateProfile = async (req, res) => {
    try {
        console.log('File received:', req.file);
        console.log('User ID:', req.params.id);

        if (!req.file) {
            return res.status(400).json({message: "No file uploaded"});
        };
        const userId = req.params.id;
        // Gunakan forward slash untuk path
        const filePath = req.file.path.replace(/\\/g, '/');
        console.log("File path:", filePath);
        // Cek apakah profile sudah ada
        const profile = await Profile.findOne({userId});
        if (profile) {
            // Update profile
            profile = await Profile.findOneAndUpdate({userId}, {profileImage: filePath}, {new: true});
        } else {
            // Membuat profile baru
            profile = await Profile.create({userId, profileImage: filePath});
        };
        res.status(200).json({message: "Profile updated successfully", data: profile});
    } catch (error) {
        console.error('error in updateProfile controller:', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = {updateProfile};