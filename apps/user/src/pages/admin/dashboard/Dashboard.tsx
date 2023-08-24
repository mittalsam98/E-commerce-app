import React, { useState } from 'react';
import AddProduct from '../../../components/add-product/AddProduct';
import AllUser from '../../../components/all-users/AllUser';
import AllOrder from '../../../components/all-orders/AllOrders';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const changeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };
  return (
    <>
      <nav className='flex border-b border-darkMode dark:border-b-lightColor'>
        <button
          type='button'
          className={`flex-1 ${
            activeTab === 1
              ? 'bg-primary text-white text-xl'
              : 'bg-white textDark textLight hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white dark:bg-darkGray text-sm'
          }   py-4 px-4 border-x border-darkMode dark:border-x-lightColor font-medium`}
          onClick={() => changeTab(1)}
        >
          Add Products
        </button>
        <button
          type='button'
          className={`flex-1 ${
            activeTab === 2
              ? 'bg-primary text-white text-xl'
              : 'bg-white textDark textLight hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white dark:bg-darkGray text-sm'
          }   py-4 px-4 font-medium`}
          onClick={() => changeTab(2)}
        >
          All users
        </button>
        <button
          type='button'
          className={`flex-1 ${
            activeTab === 3
              ? 'bg-primary text-white text-xl'
              : 'bg-white textDark textLight hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white dark:bg-darkGray text-sm'
          }   py-4 px-4 border-x border-darkMode dark:border-x-lightColor font-medium`}
          onClick={() => changeTab(3)}
        >
          All Orders
        </button>
      </nav>

      <div className='mt-6'>
        <div className={`${activeTab === 1 ? 'max-w-[650px] mx-auto' : 'hidden'}`}>
          <AddProduct />
        </div>
        <div className={`${activeTab === 2 ? 'max-w-[800px] mx-auto' : 'hidden'}`}>
          <AllUser />
        </div>
        <div className={`${activeTab === 3 ? 'max-w-screen-2xl mx-auto' : 'hidden'}`}>
          <AllOrder />
        </div>
      </div>
    </>
  );
}
