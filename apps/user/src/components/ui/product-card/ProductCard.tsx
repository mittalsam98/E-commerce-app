import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IProductSchema } from 'shared-types';
import { addToUserCart, getCartItems } from '../../../helpers/api-calls/cart';
import { useRecoilState } from 'recoil';
import { cartState } from '../../../store/atoms/cartState';
import { toast } from 'react-toastify';
import useLocalStorageLoginCheck from '../../../helpers/hooks/useLocalStorageLoginCheck';
interface ProductSchemaProps {
  product: IProductSchema;
}

const ProductCard: React.FC<ProductSchemaProps> = ({ product }) => {
  const { name, description, price, _id, images } = product;
  const [cartItem, setCartState] = useRecoilState(cartState);
  const isLoggedIn = useLocalStorageLoginCheck();
  const navigate = useNavigate();

  let image;
  if (images.length) {
    image = images[0].imgUrl;
  }
  const addToCart = (id: string) => {
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
        toast.error(err?.response?.data?.message);
      });
  };
  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden'>
      <Link to={`/product/${_id}`}>
        <img
          className='rounded-t-lg mx-auto max-h-[20rem] h-[20rem] transform duration-500 ease-in-out hover:scale-110'
          src={image}
          alt='product image'
        />
      </Link>
      <div className='p-4'>
        <Link to={`/product/${_id}`}>
          <h5 className='text-xl font-semibold tracking-tight text-darkGray dark:text-white'>
            {name}
          </h5>
          <div className='text-lg textLight textDark py-4'>{description}</div>
        </Link>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-[1.3rem] pr-1 font-bold text-darkGray dark:text-white'>
              &#8377;
            </span>
            <span className='text-[1.5rem] font-bold text-darkGray dark:text-white'>
              {price.toString()}
            </span>
          </div>
          <button
            onClick={(e) => addToCart(_id)}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
