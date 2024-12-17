import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
});

// Menambahkan token ke header
axiosInstance.interceptors.request.use((config) => {
    // Ambil token dari local storage
    const token = localStorage.getItem("accessToken"); 
    if (token) {
        console.log("Token found:", token);
        // Tambahkan token ke header
        config.headers.Authorization = `Bearer ${token}`; 
    } else {
        console.warn("No token found");
    };
    return config;
}, (error) => {
    console.error("Request error:", error.message);
    return Promise.reject(error);
});

// Handle error response dari server
axiosInstance.interceptors.response.use((response) => {
    // Jika response sukses, langsung kembalikan response
    return response;
}, (error) => {
    if (error.response) {
        console.error("Response error:", error.response.data);
        if (error.response.status === 401) {
            // Jika token expired atau tidak valid
            console.warn("Token expired or invalid");
            // Hapus token
            localStorage.removeItem("accessToken");
            // Redirect ke halama login
            window.location.href = "/"  
        };
    } else if (error.request) {
        // Jika tidak ada response dari server
        console.error("No response received:", error.request);
    } else {
        console.error("Error setting up the request:", error.message);
    };
    // Reject promise agar bisa ditangani di komponen
    return Promise.reject(error);
});

export default axiosInstance;