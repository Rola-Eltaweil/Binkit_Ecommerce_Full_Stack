import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Endpoints } from '../common/Endpoint';
import Skeleton from '../components/Skeleton';
import Productcardcategory from './Productcardcategory.JSX';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";

const ProductCategorywise = ({ categoryId }) => {
  const[data,setdata]=useState([])
  const[loading,setloading]=useState(true)
  const containerReference = useRef() 
  useEffect(() => {
    getallproductbycat();
  }, [categoryId]);

  const getallproductbycat = async () => {
    try {
         setloading(true)
      const getall = await axios.post(
        Endpoints.getallproductsbycategory.url,
        { id: categoryId },
      );
      setdata(getall?.data?.data)
    } catch (error) {
      console.log(error);
    }
    finally{
        setloading(false);
    }
  };



  const handlescrolltoRight = () =>{
     containerReference.current.scrollLeft += 200 
  }

  const handlescrollToLeft = ()=>{
   containerReference.current.scrollLeft -= 200;
  }
  return (
    <div className="relative scrollbar-none">
      <div
        className="flex w-full rounded-md gap-4 mt-2 max-w-full overflow-auto scrollbar-none scroll-smooth "
        ref={containerReference}
      >
        {loading
          ? new Array(6).fill(null).map((el, index) => (
              <div key={index} className='w-full'>
                <Skeleton />
              </div>
            ))
          : data?.map((product, index) => (
              <div key={index} className="flex-shrink-0 w-[240px]  ">
                <Productcardcategory data={product} />
              </div>
            ))}
      </div>

      <div className="max-w-full w-full hidden lg:flex justify-between items-center absolute top-28 z-10">
        <button
          onClick={handlescrollToLeft}
          className=" z-10   shadow-lg rounded-full bg-white h-7 w-7 flex items-center justify-center hover:bg-gray-100 transition-all"
        >
          <FaAngleLeft className=" rounded-full " size={17} />
        </button>
        <button
          onClick={handlescrolltoRight}
          className=" z-10  shadow-lg rounded-full bg-white h-7 w-7 flex items-center justify-center hover:bg-gray-100 transition-all"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default ProductCategorywise
