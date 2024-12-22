import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/');
          return;
        }

        const response = await axiosInstance.get('/user');
        
        if (response.data?.data) {
          setUserInfo(response.data.data);
        }
      } catch (error) {
        console.error('Error loading user info:', error);
        if (error.response?.status === 403 || error.response?.status === 401) {
          localStorage.removeItem('accessToken');
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserInfo();
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!userInfo) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Navbar userInfo={userInfo} />
    </>
  );
};

export default Home;