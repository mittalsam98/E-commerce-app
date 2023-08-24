import React from 'react';
import { Outlet } from 'react-router';
import Header from '../header/Header';

const Layout = () => {
  return (
    <div className='flex flex-col h-screen dark:bg-darkModeBg transition-all duration-200'>
      <Header />
      <main className='flex-auto md:mt-[77px] mt-[77px] bg-white dark:bg-darkMode'>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
