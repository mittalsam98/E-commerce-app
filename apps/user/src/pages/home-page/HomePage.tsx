import React, { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { RxDotFilled } from 'react-icons/rx';
import Carousel from '../../components/ui/home-ui/Carousel';
import InfoHomePage from '../../components/ui/info/InfoHomePage';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { MdOutlineSupportAgent, MdOutlineDiscount } from 'react-icons/md';
import { GiPayMoney } from 'react-icons/gi';
const infos = [
  {
    title: 'Free Shipping',
    text: 'Free shipping on all orders',
    Component: <LiaShippingFastSolid className='text-6xl textLight textDark' />
  },
  {
    title: 'Support 24*7',
    text: 'Customer support available 24*7!',
    Component: <MdOutlineSupportAgent className='text-6xl textLight textDark' />
  },
  {
    title: 'Money Back',
    text: 'Product Return within 10 days',
    Component: <GiPayMoney className='text-6xl textLight textDark' />
  },
  {
    title: 'Huge Discount',
    text: 'Enjoy huge upto 20% on each product',
    Component: <MdOutlineDiscount className='text-6xl textLight textDark' />
  }
];
function HomePage() {
  return (
    <div>
      <Carousel />
      <div className='flex justify-center items-center'>
        <div className='mt-16 flex flex-wrap space-x-5 justify-center items-center'>
          {infos.map((info) => (
            <InfoHomePage {...info} key={info.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
