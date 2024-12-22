import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PaswordInput from "../components/Input/PaswordInput";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      const { data } = response.data;
      if (!data?.accessToken) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("accessToken", `Bearer ${data.accessToken}`);
      
      if (data.user) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }

      console.log("Login successful");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      setError(
        error.response?.data?.message || 
        error.message || 
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="py-10 bg-white border rounded w-96 px-7">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>
          <input
            type="email"
            placeholder="Email"
            className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none focus:border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <PaswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          {error && (
            <p className="pb-1 text-xs text-red-500">{error}</p>
          )}
          <button
            type="submit"
            className={`w-full p-2 my-1 text-sm text-white rounded ${
              loading 
                ? 'bg-purple-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-purple-600'
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="mt-4 text-sm text-center">
            Not registered yet?{" "}
            <Link 
              to="/register" 
              className="font-medium underline text-primary hover:text-purple-600"
            >
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;