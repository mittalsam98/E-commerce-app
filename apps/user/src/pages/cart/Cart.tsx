import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { MdDelete, MdShoppingCartCheckout } from 'react-icons/md';
import { IProductSchema } from 'shared-types';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { cartState } from '../../store/atoms/cartState';
import { deleteFromUserCart, getCartItems } from '../../helpers/api-calls/cart';
import empty from '../../images/empty.png';
import { cartTotalPriceSelector } from '../../store/selectors/cartSelector';

export default function Cart() {
  const cartItem = useRecoilValue<IProductSchema[]>(cartState);
  const totalPrice = useRecoilValue(cartTotalPriceSelector);
  const setCartState = useSetRecoilState(cartState);
  const navigate = useNavigate();

  const openItem = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteFromUserCart(id)
      .then((res) => {
        toast.success(res?.message);
        getCartItems().then((res) => {
          setCartState(res.cart);
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className='px-8 max-w-[80rem] mx-auto sm:my-8 w-full'>
      <h1 className='title my-12'>{'Your Cart'}</h1>
      <table className='mx-auto'>
        <tbody className='divide-y divide-palette-lighter'>
          {cartItem && cartItem.length > 0 ? (
            <>
              <thead>
                <tr className='uppercase text-xs sm:text-sm text-primary border-b border-palette-light'>
                  <th className='font-semibold text-[16px] px-6 py-4'>Product</th>
                  <th className='font-semibold text-[16px] px-6 py-4 sm:table-cell'>Price</th>
                  <th className='font-semibold text-[16px] px-6 py-4'>Remove</th>
                </tr>
              </thead>
              {cartItem.map((item, index) => {
                return (
                  <tr className='text-center'>
                    <td
                      onClick={() => openItem(item._id)}
                      className='font-medium px-4 sm:px-6 py-4 flex items-center'
                    >
                      <img
                        src={item.images[0].imgUrl}
                        alt={item.images[0].id}
                        height={64}
                        width={64}
                        className={`hidden sm:inline-flex mx-3`}
                      />
                      <Link
                        to={`/product/${item._id}`}
                        className='pt-1 text-xl hover:text-primary textLight textDark'
                      >
                        {/* <a className='pt-1 hover:text-palette-dark'> */}
                        {item.name}
                        {/* </a> */}
                      </Link>
                    </td>

                    <td className='textLight textDark px-4 text-xl sm:px-6 py-4 sm:table-cell'>
                      &#8377; {item.price}
                    </td>
                    <td className='font-medium px-4 sm:px-6 py-4'>
                      <button aria-label='delete-item' className=''>
                        <MdDelete
                          onClick={() => handleDelete(item._id)}
                          className='text-4xl textLight textDark text-dark border-[2px] border-darkGray p-1 hover:border-red-600 hover:text-red-600 hover:scale-105'
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr className='text-center'>
              <img src={empty} />
              <h1 className='my-12 text-3xl font-bold textLight textDark'>
                {'Your Cart is Empty '}
              </h1>
            </tr>
          )}
          {totalPrice <= 0 ? null : (
            <tr className='text-right'>
              <td className='textLight textDark font-bold  px-4 sm:px-6 py-4'>TOTAL</td>
              <td className='text-lg textLight textDark font-bold px-4 sm:px-6 py-4'>
                &#8377; {totalPrice}
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
      {cartItem && cartItem.length > 0 ? (
        <>
          <button
            onClick={() => {
              navigate('/checkout');
            }}
            className='px-24 mt-8 py-2 mx-auto w-[24rem] max-w-[24rem]  text-white font-semibold flex justify-center items-center bg-primary  border border-primary'
          >
            Check Out
            <MdShoppingCartCheckout className='w-[24px] h-[24px] ml-2 inline-flex' />
          </button>
          <Link
            to='/shop'
            className='py-2 w-1/2 mx-auto max-w-[24rem] mt-4 text-primary font-semibold flex justify-center items-center bg-white dark:bg-gray-800 border border-primary'
          >
            <IoMdArrowBack className='w-4 mr-2 inline-flex' />
            Back To All Products
          </Link>
        </>
      ) : null}
    </div>
  );
}
