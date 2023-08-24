import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IProductSchema } from 'shared-types';
import { IoMdCart, IoMdArrowBack } from 'react-icons/io';
import { useParams } from 'react-router';
import { addToUserCart, getCartItems } from '../../../helpers/api-calls/cart';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { cartState } from '../../../store/atoms/cartState';
import useLocalStorageLoginCheck from '../../../helpers/hooks/useLocalStorageLoginCheck';

interface ProductSchemaProps {
  productDetails: IProductSchema;
}

const ProductDetails: React.FC<ProductSchemaProps> = ({ productDetails }) => {
  const { name, description, price } = productDetails;
  const [cartItem, setCartState] = useRecoilState(cartState);
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useLocalStorageLoginCheck();

  const addToCart = () => {
    if (!isLoggedIn) {
      return navigate('/login');
    }
    addToUserCart(id)
      .then((res) => {
        getCartItems().then((res) => {
          setCartState(res.cart);
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <div className='flex flex-col justify-between h-full w-full md:w-1/3 min-h-128 '>
        <Link
          to='/shop'
          className='pt-2 pb-1 text-primary font-semibold flex justify-center items-center bg-white dark:bg-gray-800 border border-primary'
        >
          <IoMdArrowBack className='w-4 mr-2 inline-flex' />
          Back To All Products
        </Link>
        <div>
          <h1 className='leading-relaxed font-extrabold text-3xl text-primary py-2 sm:py-4'>
            {name}
          </h1>
          <p className='font-medium text-lg textDark textLight'>{description}</p>
          <div className='text-xl text-primary font-medium py-4 px-1'>
            <span className='text-[1.3rem] pr-1 font-bold '>&#8377;</span>
            <span className='text-[1.5rem] font-bold '>{price.toString()}</span>
          </div>
        </div>
        <button
          className='pt-2 pb-1 text-white font-semibold flex justify-center items-center bg-primary  border border-primary'
          onClick={addToCart}
        >
          <IoMdCart className='w-4 mr-2 inline-flex' />
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
