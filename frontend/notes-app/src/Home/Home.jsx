import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <>
    <Navbar userInfo={userInfo} />
    </>
  )
}

export default Home