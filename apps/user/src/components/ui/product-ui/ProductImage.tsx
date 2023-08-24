import React, { useRef, useState } from 'react';
import { IImages } from 'shared-types';

interface ImagesProps {
  images: IImages[];
}
// import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

export default function ProductImage({ images }: ImagesProps) {
  const [mainImg, setMainImg] = useState<string>(images[0].imgUrl);

  return (
    <div className='w-full md:w-1/2 max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg'>
      <div className='relative h-[24rem] overflow-hidden'>
        <img
          src={mainImg}
          className='rounded-t-lg m-auto h-full max-h-[24rem] transform duration-500 ease-in-out hover:scale-110 '
        />
      </div>
      <div className='relative flex border border-gray-200 dark:border-gray-700 '>
        {/* <button
          aria-label='left-scroll'
          className='h-32 bg-primary rounded-r-sm hover:opacity-100 absolute left-0 z-10 opacity-25'
          // onClick={() => scroll(-300)}
        >
          <IoMdArrowBack className='w-3 mx-1 textDark opacity:100' />
        </button> */}
        <div
          // ref={ref}
          style={{ scrollBehavior: 'smooth' }}
          className='flex space-x-1 w-full overflow-auto'
        >
          {images.map((imgItem, index) => (
            <button
              key={index}
              className='p-2 relative w-36 h-32 flex-shrink-0 rounded-sm '
              onClick={() => setMainImg(imgItem.imgUrl)}
            >
              <img src={imgItem.imgUrl} className='rounded-sm max-w-32 max-h-28 mx-auto' />
            </button>
          ))}
        </div>
        {/* <button
          aria-label='right-scroll'
          className='h-32 bg-primary rounded-l-sm hover:opacity-100 absolute right-0 z-10 opacity-25'
          // onClick={() => scroll(300)}
        >
          <IoMdArrowForward className='w-3 mx-1 textDark opacity:100' />
        </button> */}
      </div>
    </div>
  );
}
