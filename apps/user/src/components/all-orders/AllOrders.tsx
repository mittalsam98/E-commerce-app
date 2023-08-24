import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { OrderState } from '../../helpers/utils/types';
import { getAllOrder } from '../../helpers/api-calls/admin';

export default function AllOrder() {
  const [orders, setOrders] = useState<OrderState[]>([]);

  const getAllOrderApiCall = () => {
    getAllOrder()
      .then((res) => {
        setOrders(res.orders);
      })
      .catch((err) => {
        toast.error(JSON.stringify(err));
      });
  };

  useEffect(() => {
    getAllOrderApiCall();
  }, []);

  return (
    <div className='mx-auto px-4 py-8 '>
      <div className='overflow-y-hidden rounded-lg border'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-primary text-left text-xs uppercase text-white'>
                <th className='px-5 py-3'>Customer</th>
                <th className='px-5 py-3'>Address</th>
                <th className='px-5 py-3'>Order</th>
                <th className='px-5 py-3'>Status</th>
              </tr>
            </thead>
            <tbody className='textLight textDark bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
              {orders.map((order, index) => {
                return (
                  <tr className='text-left border-b-[2px]'>
                    <td className='px-5 py-5 text-sm'>
                      {order?.user.firstName} {order?.user.lastName}
                    </td>
                    <td className='px-5 py-5 text-sm'>
                      <span className='font-semibold'>
                        {order.address.city}
                        <span> ({order.address.zipCode}),</span> {order.address.state},{' '}
                        {order.address.country}
                        <div className='font-normal'>{order.address.phoneNumber}</div>
                      </span>
                    </td>
                    <td className='px-5 py-5 text-sm'>
                      {order.products.map((val, index) => {
                        return (
                          <div>
                            {val.product.name}
                            <div>{new Date(val.purchaseDate).toLocaleDateString()}</div>
                          </div>
                        );
                      })}
                      {}
                    </td>
                    <td className='px-5 py-5 text-sm'>
                      <span
                        className={`rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900`}
                      >
                        {'Completed'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
