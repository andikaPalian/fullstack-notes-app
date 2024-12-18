const Profile = require("../models/profile.models");

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const filePath = req.file.path;
        const updatedProfile = await Profile.findOneAndUpdate({userId}, {profileImage: filePath}, {new: true});
        if (!updatedProfile) {
            return res.status(404).json({message: 'Profile not found'});
        };
        res.status(200).json({message: "Profile updated successfully", data: updatedProfile});
    } catch (error) {
        console.error('error in updateProfile controller:', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = {updateProfile};