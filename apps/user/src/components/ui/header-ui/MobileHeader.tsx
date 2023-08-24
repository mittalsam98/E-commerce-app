import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SlBasket } from 'react-icons/sl';
import DarkToggler from './DarkToggler';

type activeHamburger = {
  activeHamburger: boolean;
  setActiveHamburger: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileHeader(props: activeHamburger) {
  const { activeHamburger, setActiveHamburger } = props;
  return (
    <nav
      className={`${!activeHamburger && 'invisible'} ${
        activeHamburger && 'opacity-[1] visible'
      } transition-all duration-300 z-[999] opacity-0  fixed right-0 bg-[rgba(0,0,0,.8)] h-screen top-0 w-full`}
    >
      <div
        className={`${activeHamburger && 'translate-y-0'} ${
          !activeHamburger && 'translate-y-[100%]'
        } transition-all duration-300  mt-4 pt-16 bg-white dark:bg-darkMode flex flex-col items-center gap-y-7 ml-auto h-screen rounded-tl-[2.375rem] rounded-tr-[2.375rem] `}
      >
        <ul className='flex items-center flex-col gap-y-6'>
          <li>
            <NavLink onClick={() => setActiveHamburger(false)} className='nav-item pb-4' to='/shop'>
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={() => setActiveHamburger(false)}
              className='nav-item pb-4'
              to='/contact'
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className='flex flex-col gap-8 mt-12'>
          <div className='flex gap-8'>
            <Link onClick={() => setActiveHamburger(false)} to={'/cart'} className='relative group'>
              <SlBasket className='text-2xl textDark' />
              <div className='hover-information transition-all group-hover:opacity-[1] group-hover:visible textDark'>
                Cart
              </div>

              <span className='textLight absolute aspect-square top-[-5px] right-[-5px] text-xs min-w-[15px] min-h-[15px] flex items-center justify-center bg-primary rounded-full'>
                {'2'}
              </span>
            </Link>
          </div>
          <div className='flex gap-8 items-center'>
            <DarkToggler />
            {/* <UserLoginButton setActiveHamburger={setActiveHamburger} /> */}
          </div>
        </div>
        <button
          onClick={() => setActiveHamburger(false)}
          className='absolute right-9 top-5 text-4xl font-medium hover:text-primary textDark'
        >
          &#x2717;
        </button>
      </div>
    </nav>
  );
}
