import React from 'react'
import img from '../assets/page-not-found-error.jpg'
const NotFound = () => {
  return (
    <div className='flex justify-center items-center bg-white'>
      <img src={img} alt={img} className='h-[calc(100vh-140px)] w-full object-contain' />
    </div>
  );
}

export default NotFound