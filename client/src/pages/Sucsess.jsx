import React from 'react'
import payment from '../assets/onlinepayment.jpg'
import { Link, useLocation } from 'react-router-dom';
const Sucsess = () => {
    const location =useLocation() 
    console.log(location ,'lo');
  return (
    <div className="bg-white relative">
      <div className="bg-green-200 max-w-[200px] md:max-w-sm py-3 text-center absolute top-4 w-full left-4">
        <p>
          {location?.state === "Order" ? (
            <span className="text-green-800 text-[16px] font-bold">
              {" "}
              {location?.state} Successfully
            </span>
          ) : (
            <span className="text-green-800 text-[16px] font-bold">
              Payment Successfully
            </span>
          )}
        </p>
        <Link to={"/"}>
          <p className="text-[16px] text-green-800 border border-green-800 w-fit mx-auto mt-1  px-2 py-0.5 rounded-sm hover:bg-green-800 hover:text-white transition-all">
            {" "}
            Go to home
          </p>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <img src={payment} alt="image" className="max-h-[82vh]" />
      </div>
    </div>
  );
}

export default Sucsess
