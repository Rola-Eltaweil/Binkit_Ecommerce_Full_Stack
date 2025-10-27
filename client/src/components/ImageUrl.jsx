import React from 'react'
import { IoClose } from 'react-icons/io5'

const ImageUrl = ({ url, close }) => {
  return (
    <section className="top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-50 fixed flex justify-center items-center w-full h-full ">
      <div className="bg-white relative  rounded-sm flex items-center justify-center max-w-sm w-full max-h-[70vh] p-4">
        <IoClose
          onClick={close}
          className="absolute top-4 right-4 cursor-pointer hover:text-red-700 transition-all"
          size={24}
        />
        <img
          src={url}
          alt={url}
          className=" max-h-full max-w-full object-contain mt-20"
        />
      </div>
    </section>
  );
};

export default ImageUrl
