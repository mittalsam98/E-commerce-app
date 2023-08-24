import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import DarkToggler from '../ui/header-ui/DarkToggler';
import UserLogin from '../ui/header-ui/UserLogin';
import useLocalStorageLoginCheck from '../../helpers/hooks/useLocalStorageLoginCheck';
import MobileHeader from '../ui/header-ui/MobileHeader';
import UserMenu from '../ui/header-ui/UserMenu';

const Header = () => {
  const isLoggedIn = useLocalStorageLoginCheck();

  const [activeHamburger, setActiveHamburger] = useState<boolean>(false);

  return (
    <header className='bg-white fixed flex-1 w-full top-0 left-0 z-50 dark:bg-darkMode '>
      <div className='main-container px-12 py flex justify-between items-center border-b border-gray-500 dark:border-lightColor min-h-[77px]'>
        <Link
          to='/'
          className='textLight font-bold text-[32px] textDark transition-all duration-200'
        >
          THE<span className='text-primary logo'>SHOP</span>
        </Link>

        {/* Desktop Screen Navbar */}

        <nav className=' justify-center items-center p-3 md:flex hidden'>
          <NavLink className='nav-item' to='/shop'>
            Shop
          </NavLink>
          <NavLink className='nav-item mr-4' to='/contact'>
            Contact
          </NavLink>
          {!isLoggedIn ? <UserLogin /> : null}
          <DarkToggler />
          {isLoggedIn ? <UserMenu /> : null}
        </nav>

        <button
          onClick={() => setActiveHamburger(true)}
          className='text-2xl md:hidden block ml-auto'
        >
          <RxHamburgerMenu className='textDark textLight' />
        </button>

        {/* Mobile Screen Navbar */}
        <MobileHeader activeHamburger={activeHamburger} setActiveHamburger={setActiveHamburger} />
      </div>
    </header>
  );
};

export default Header;
