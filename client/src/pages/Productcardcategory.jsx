import React from "react";
import convertpriceTocurrency from "../utils/convertpriceTocurrency";
import { Link } from "react-router-dom";
import { pricewithdiscount } from "../utils/Pricewithdiscount";
import AddTocartButton from "./AddTocartButton";


const Productcardcategory = ({ data }) => {
  const URL = `/product/${data?._id}/${data?.name}`;

  return (
    <>
      <Link to={URL}>
        <div className="bg-white cursor-pointer  h-auto shadow-sm border border-gray-300 px-3 py-4 rounded-sm ">
          <div className="flex items-center justify-center">
            <img
              src={data?.image[0]}
              className="lg:w-[130px] lg:h-[140px] w-[100px] h-[100px] object-cover"
            />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <h5 className="bg-green-100 text-green-700 whitespace-nowrap text-[12px] lg:text-[14px] w-fit px-2 rounded-md ">
              10 min
            </h5>
            {data?.discount !== 0 ? (
              <p className="bg-green-100 whitespace-nowrap text-green-700 text-[12px] lg:text-[14px] w-fit px-2 rounded-md ">
                {data?.discount}% discount
              </p>
            ) : null}
          </div>
          <p className="text-[14px] lg:text-[16px] font-semibold line-clamp-1 mt-2">
            {data?.name}
          </p>
          <p className="text-[14px] lg:text-[16px] line-clamp-1 mt-1">
            {data?.descreption}
          </p>
          <p className="text-[14px] lg:text-[16px] mt-1">{data?.unit}</p>
          <div className="flex justify-between items-center mt-2">
            <p className=" text-[15px] font-semibold">
              {convertpriceTocurrency(
                pricewithdiscount(data?.price, data?.discount)
              )}
            </p>
            {data?.stock === 0 ? (
              <p className="text-[15px] text-red-500">Out of stock</p>
            ) : (
            <AddTocartButton data={data}/>
            )}
          </div>
        </div>
      </Link>

      
    </>
  );
};

export default Productcardcategory;
