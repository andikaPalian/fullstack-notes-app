import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
import Profile from '../Cards/Profile';

const Navbar = ({userInfo}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    console.log('Navbar received userInfo:', userInfo);

    const onLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const handleSearch = () => {};

    const onClearSearch = () => {
        setSearchQuery("");
    };
  return (
    <div className='flex items-center justify-between px-6 py-2 bg-white drop-shadow'>
        <h2 className='py-2 text-xl font-medium text-black'>Notes</h2>
        <SearchBar value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}} handleSearch={handleSearch} onClearSearch={onClearSearch} />
        <Profile userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar