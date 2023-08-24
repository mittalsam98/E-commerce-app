import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function UserLogin() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <span className='pl-2 pr-4 border-l'>
      <NavLink className='nav-item mr-4' to='/login'>
        Login
      </NavLink>
      <button
        className='px-4 py-1 border-slate-600 bg-gray-100 border-[2px] dark:border-lightColor dark:bg-darkMode dark:text-lightColor rounded-full'
        onClick={handleRegister}
      >
        Register
      </button>
    </span>
  );
}
