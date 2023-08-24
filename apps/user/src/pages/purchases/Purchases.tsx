import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { PurchasesState } from '../../helpers/utils/types';
import { purchasesState } from '../../store/atoms/userState';
import { getAllPurchasedItem } from '../../helpers/api-calls/user';

export default function Purchases() {
  const [purchases, setPurchases] = useRecoilState<PurchasesState[]>(purchasesState);
  useEffect(() => {
    getAllPurchasedItem().then((res) => {
      setPurchases(res.purchases);
    });
  }, []);
  return (
    <div className='px-8 max-w-[80rem] mx-auto sm:my-8 w-full'>
      <h1 className='title my-12'>{'Order Summary'}</h1>
      <table className='w-1/2 mx-auto'>
        <thead>
          <tr className='bg-primary text-left text-xs uppercase text-white'>
            <th className='px-5 py-3'>Item</th>
            <th className='px-5 py-3'>Amount</th>
          </tr>
        </thead>
        <tbody className='textLight textDark bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
          {purchases && purchases.length > 0 ? (
            <>
              {purchases.map((item, index) => {
                console.log(item);
                return (
                  <tr className='text-left border-b-[2px]'>
                    <td
                      //   onClick={() => openItem(item._id)}
                      className='font-medium py-4 flex items-center'
                    >
                      <img
                        src={item.product.images[0].imgUrl}
                        alt={item.product.images[0].id}
                        height={64}
                        width={64}
                        className={` sm:inline-flex mx-3`}
                      />
                      <Link
                        to={`/product/${item.product._id}`}
                        className='pt-1 text-xl hover:text-primary textLight textDark'
                      >
                        {/* <a className='pt-1 hover:text-palette-dark'> */}
                        {item.product.name}
                        {/* </a> */}
                      </Link>
                    </td>

                    <td className='textLight textDark px-4 text-xl sm:px-6 py-4 sm:table-cell'>
                      &#8377; {item.product.price}
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr className='text-center'>
              <h1 className='my-12 text-3xl font-bold textLight textDark'>
                {'Your have no orders to show '}
              </h1>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
