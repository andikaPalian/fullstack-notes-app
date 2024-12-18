import React from 'react'
import getInitials from '../../utils/getInitials'

const Profile = (userInfo, onLogout) => {
  return (
    <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center w-12 h-12 font-medium rounded-full text-slate-950 bg-slate-100'>
            {getInitials(userInfo?.username || "Guest")}
        </div>
        <p className='text-sm font-medium'>
            {userInfo?.username || "Guest"}
        </p>
        <button className='text-sm underline text-slate-700' onClick={onLogout}>Logout</button>
    </div>
  )
}

export default Profile