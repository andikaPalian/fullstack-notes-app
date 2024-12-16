import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6';

const PaswordInput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!isShowPassword);
    }

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input type={isShowPassword ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder || "pasword"} className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none' />
        {isShowPassword ? (
            <FaRegEye size={22} className='text-primary cursor-pointer' onClick={() => toggleShowPassword()} />
        ) : (<FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={() => toggleShowPassword()} />)}
    </div>
  )
}

export default PaswordInput