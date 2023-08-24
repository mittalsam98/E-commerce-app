import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { BsInfoCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import InputField from '../../components/ui/input/Input';
import { AddressParams, addressSchema } from 'shared-types/index';
import { setApiErrors } from '../../helpers/utils/utilsFunctions';
import Cart from '../cart/Cart';
import { checkout, getKey, paymentVerification } from '../../helpers/api-calls/payment';
import { cartTotalPriceSelector } from '../../store/selectors/cartSelector';
import { RazorpayResponse } from '../../helpers/utils/types';
import { cartState } from '../../store/atoms/cartState';

export default function Checkout() {
  const totalPrice = useRecoilValue(cartTotalPriceSelector);
  const setCartState = useSetRecoilState(cartState);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<AddressParams>({ resolver: zodResolver(addressSchema) });

  const onSubmit: SubmitHandler<AddressParams> = async (data) => {
    checkoutHandler(data);
    try {
    } catch (err) {
      if (err instanceof AxiosError) {
        const apiErrors = err.response?.data;
        setApiErrors(setError, apiErrors);
      }
    }
  };
  const checkoutHandler = async (address: AddressParams) => {
    const key = await getKey(); // Get the Razorpay key from the BE

    const order = await checkout(totalPrice);

    const options = {
      key: key,
      amount: totalPrice,
      currency: 'INR',
      name: 'TheSHOP',
      description: 'Payment for product(s) purchase',
      image:
        'https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.webp?b=1&s=170667a&w=0&k=20&c=qjK4h0qt4W_NNG8TmboGw8RDRv8TNzEoFM_JEDZ1Ah0=',
      order_id: order?.id,
      handler: function async(response: RazorpayResponse) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
        const data = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        };
        // Verify the payment is success of not
        paymentVerification(data, address)
          .then((res) => {
            toast.success(res.message);
            setCartState([]);
            navigate('/purchases');
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      },
      prefill: {},
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#8B5CF6'
      }
    };

    const razor = new (window as any).Razorpay(options);

    if (order?.id) {
      razor.open();
    }
  };
  if (totalPrice === 0) {
    return <Cart />;
  }
  return (
    <>
      <div className='lg:col-span-2 col-span-3 space-y-8 px-12'>
        <div className='mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-primaryLight shadow rounded-md'>
          <div className='flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0'>
            <span className='text-sm textLight font-bold ml-3'>
              <BsInfoCircle className='mr-2 text-lg font-bold text-orange-500' />
            </span>
            Checkout
          </div>
          <div className='text-sm tracking-wide textLight mt-4 sm:mt-0 sm:ml-4'>
            Complete your shipping and payment details below.
          </div>
        </div>
        <div className='rounded-md max-w-md mx-auto'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section>
              <h2 className='uppercase text-lg font-semibold textDark textLight my-2'>
                Shipping & Billing Information
              </h2>
              <InputField
                label='City'
                name='city'
                register={register}
                error={errors.city?.message}
              />
              <InputField
                label='Zipcode'
                type='number'
                name='zipCode'
                register={register}
                error={errors.zipCode?.message}
              />
              <InputField
                label='State'
                name='state'
                register={register}
                error={errors.state?.message}
              />
              <InputField
                label='Country'
                name='country'
                register={register}
                error={errors.country?.message}
              />
              <InputField
                label='Phone number'
                type='number'
                name='phoneNumber'
                register={register}
                error={errors.phoneNumber?.message}
              />
            </section>
            <button
              type='submit'
              className='submit-button px-4 py-3 mx-auto rounded-full bg-primaryLight mt-4 textLight focus:ring focus:outline-none w-full text-xl font-semibold transition-colors'
            >
              Pay Now &#8377; {totalPrice}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
