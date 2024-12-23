import React, { useState } from "react";
import getInitials from "../../utils/getInitials";
import axiosInstance from "../../utils/axiosInstance";

const Profile = ({ userInfo, onLogout }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please log in to upload a profile picture");
      return;
    };
    
    // Validasi userInfo
    if (!userInfo || !userInfo._id) {
      console.error("User info not available:", userInfo);
      alert("Please log in to upload a profile picture");
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5mb");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    setIsUploading(true);

    try {
      console.log('Making request to:', `/profile/${userInfo._id}`);
      const response = await axiosInstance.put(
        `/profile/${userInfo._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            console.log("Upload progress:", percentCompleted, '%')
          }
        }
      );
      console.log('Upload response:', response.data);
      if (response.data?.data?.profileImage) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Upload error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      
      let errorMessage = 'Failed to upload image. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative group">
        {userInfo?.profileImage ? (
          <img
            src={`http://localhost:3000/${userInfo.profileImage}`}
            alt={userInfo?.username || "Guest"}
            className="object-cover w-12 h-12 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-12 h-12 font-medium rounded-full text-slate-950 bg-slate-100">
            {getInitials(userInfo?.username || "Guest")}
          </div>
        )}

        {/* Upload overlay */}
        <label className="absolute inset-0 flex items-center justify-center transition-all bg-black bg-opacity-0 rounded-full cursor-pointer group-hover:bg-opacity-50">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          <span className="text-xs text-white opacity-0 group-hover:opacity-100">
            {isUploading ? "Uploading..." : "Change"}
          </span>
        </label>
      </div>

      <p className="text-sm font-medium">{userInfo?.username || "Guest"}</p>
      <button className="text-sm underline text-slate-700" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
