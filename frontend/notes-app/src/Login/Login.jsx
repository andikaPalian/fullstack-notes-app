import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PaswordInput from "../components/Input/PaswordInput";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      const { token } = response.data;
      // Simpan token ke localstorage
      localStorage.setItem("accessToken", token);
      console.log("Login successfully", response.data);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
      console.error("Login error", error.response?.data || error.message);
    }
  };
  return (
    <div className="flex items-center justify-center mt-28">
      <div className="py-10 bg-white border rounded w-96 px-7">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>
          <input
            type="text"
            placeholder="Email"
            className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PaswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="pb-1 text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 my-1 text-sm text-white rounded bg-primary hover:bg-purple-600"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-center">
            Not registered yet?{" "}
            <Link to="/register" className="font-medium underline text-primary">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
