import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=' bg-gray-100 py-3'>
        <div className='container flex justify-between items-center'>
        <p className='capitalize text-[16px] text-neutral-700'> &copy; all rights  reserved</p>
        <div className='flex items-center gap-2 '>
          <FaFacebook/>
          <FaInstagram/>
          <FaLinkedin/>
        </div>
        </div>
    </div>
  )
}

export default Footer
