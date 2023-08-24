import React, { useEffect } from 'react';
import { VscAccount } from 'react-icons/vsc';
import { GrUserAdmin } from 'react-icons/gr';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, authTokenState } from '../../../store/atoms/userState';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMdCart } from 'react-icons/io';
import { getCartItems } from '../../../helpers/api-calls/cart';
import { cartState } from '../../../store/atoms/cartState';

export default function UserMenu() {
  const user = useRecoilValue(userState);
  const setAuthToken = useSetRecoilState(authTokenState);
  const [cartItem, setCartState] = useRecoilState(cartState);
  const navigate = useNavigate();
  useEffect(() => {
    getCartItems().then((res) => {
      setCartState(res.cart);
    });
  }, []);

  const handleLogOut = async () => {
    localStorage.clear();
    setAuthToken(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <div className='flex items-center ml-3 pl-3 border-l'>
      <Link to='/cart' className='relative group'>
        <IoMdCart className='text-4xl p-1 rounded-full border-[2px] border-slate-600 dark:border-lightColor textDark text-slate-600' />
        <span className='absolute top-[-5px] right-[-5px] text-xs min-w-[18px] min-h-[18px] flex items-center justify-center bg-primary text-lightColor rounded-full'>
          {cartItem && cartItem.length}
        </span>
      </Link>
      <div className='relative group cursor-pointer'>
        <VscAccount className='text-4xl mx-2 textDark text-slate-600' />
        <div className='user-icon text-center transition-all group-hover:opacity-[1] group-hover:visible '>
          <div>
            <button
              onClick={() => handleLogOut()}
              className='min-h-[30px] dark:text-darkGray text-lightColor font-semibold text-xl hover:text-primary dark:hover:text-primary transition-all '
            >
              Logout
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate('/purchases')}
              className='min-h-[30px] dark:text-darkGray text-lightColor font-semibold text-xl hover:text-primary dark:hover:text-primary transition-all '
            >
              Your orders
            </button>
          </div>
        </div>
      </div>
      {/* <VscAccount className=' h-9 w-9 mr-2 textDark text-slate-600' /> */}{' '}
      {user.isAdmin && (
        <Link to='/admin/dashboard' className='relative group'>
          <div className='px-4 py-1 mr-2 border-slate-600 bg-gray-100 border-[2px] dark:border-lightColor dark:bg-darkMode dark:text-lightColor rounded-full'>
            Admin Dashboard
          </div>
        </Link>
      )}
      <div className='px-4 py-1 border-slate-600 bg-gray-100 border-[2px] dark:border-lightColor dark:bg-darkMode dark:text-lightColor rounded-full'>
        {user.user.firstName}
      </div>
    </div>
  );
}
