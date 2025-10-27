import React from 'react'
import Nodata from '../assets/nothing here yet.webp'
const NoDataHere = () => {
  return (
    <div className='flex flex-col justify-center items-center  '>
        <img  src={Nodata} className='h-56 w-56'/>
        <p className='text-[16px] font-medium text-neutral-700'>No Data</p>
    </div>
  )
}

export default NoDataHere
