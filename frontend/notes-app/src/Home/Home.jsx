import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/");
          return;
        };

        const response = await axiosInstance.get("/user");
        console.log("Loaded user info:", response.data);

        if (response.data.data) {
          setUserInfo(response.data.data);
        };
      } catch (error) {
        console.error("Error loading user info", error);
        localStorage.removeItem("accessToken");
        navigate("/");
      };
    };

    loadUserInfo();
  }, [navigate]);

  if (!userInfo) {
    return <div>Loading...</div>
  }
  return (
    <>
    <Navbar userInfo={userInfo} />
    </>
  )
}

export default Home