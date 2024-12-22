const Profile = require("../models/profile.models");

const updateProfile = async (req, res) => {
    try {
        console.log('File received:', req.file);
        console.log('User ID:', req.params.id);

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const userId = req.params.id;
        // Gunakan forward slash untuk path dan tambahkan uploads di depan
        const filePath = 'uploads/' + req.file.path.split('uploads/')[1].replace(/\\/g, '/');
        console.log("File path:", filePath);

        try {
            // Coba update dulu
            let profile = await Profile.findOneAndUpdate(
                { userId },
                { profileImage: filePath },
                { new: true }
            );

            // Jika tidak ada profile yang diupdate, buat baru
            if (!profile) {
                profile = await Profile.create({
                    userId,
                    profileImage: filePath
                });
            }

            res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                data: profile
            });
        } catch (dbError) {
            console.error('Database operation error:', dbError);
            return res.status(500).json({
                message: "Failed to update profile",
                error: dbError.message
            });
        }
    } catch (error) {
        console.error('Error in updateProfile controller:', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred"
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error('Error in getProfile controller:', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = {
    updateProfile,
    getProfile
};