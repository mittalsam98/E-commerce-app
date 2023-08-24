import React, { ReactElement } from 'react';
import { IconType } from 'react-icons';
type InfoProps = {
  title: string;
  text: string;
  Component: ReactElement;
};

const InfoHomePage = ({ title, text, Component }: InfoProps) => (
  <div className='flex'>
    <div className='w-20 h-24 hover:animate-wiggle'>{Component}</div>
    <div className='w-44'>
      <p className='text-md font-bold textLight textDark'>{title}</p>
      <p className='text-sm font-normal textLight textDark'>{text}</p>
    </div>
  </div>
);
export default InfoHomePage;
