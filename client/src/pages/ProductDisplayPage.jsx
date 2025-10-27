import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import axios from "axios";
import { Endpoints } from "../common/Endpoint";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import Divider from "../components/Divider";
import convertpriceTocurrency from "../utils/convertpriceTocurrency";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { pricewithdiscount } from "../utils/Pricewithdiscount";
import AddTocartButton from "./AddTocartButton";

const ProductDisplayPage = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [image, setimage] = useState([]);
  const pararms = useParams();
  const productId = pararms?.productId;
  // const productname = pararms?.productname
  const [selectIndex, setselectIndex] = useState(0);
  const currentcontainer = useRef();

  useEffect(() => {
    if (productId) {
      getprodcutDetails();
    }
  }, [pararms, productId]);

  const getprodcutDetails = async () => {
    try {
      setloading(true);
      const res = await axios.post(
        Endpoints.getproductDetails.url,
        { productId },
        { withCredentials: true }
      );
      if (res) {
        console.log(res?.data?.data);
        setdata(res?.data?.data);
        setimage(res?.data?.data?.image);
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };

  const handletoleft = () => {
    currentcontainer.current.scrollLeft -= 100;
  };

  const handletoRight = () => {
    currentcontainer.current.scrollLeft += 100;
  };
  console.log(data, "data");

  return (
    <section className="flex flex-col md:flex-row max-w-[90%] w-full mx-auto py-6 gap-3">
      <div className="flex flex-col gap-3  overflow-x-scroll scrollbar-none w-[80%]">
        <div className="bg-white flex justify-center  items-center rounded-sm shadow-md">
          <img
            src={image[selectIndex]}
            className="py-7 max-w-[150px] h-[200px] sm:max-w-[200px] sm:h-[240px] md:max-w-[280px] md:h-[350px] object-cover "
          />
        </div>
        <div className="flex justify-center items-center gap-3">
          {image?.map((circle, index) => (
            <div
              onClick={() => setselectIndex(index)}
              key={index}
              className={`h-2 md:h-3 w-2 md:w-3 rounded-full cursor-pointer ${
                selectIndex === index ? "bg-gray-300" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
        <div className="">
          <div
            className="flex items-center gap-3  overflow-hidden max-w-[500px] w-full relative"
            ref={currentcontainer}
          >
            {image?.map((img, index) => (
              <div
                key={index}
                className="bg-white rounded-sm shadow-md w-[150px] h-[120px] p-2 flex  justify-center items-center  flex-shrink-0 cursor-pointer"
                onClick={() => setselectIndex(index)}
              >
                <img src={img} className=" h-full w-full object-cover " />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center relative bottom-12">
            <button
              onClick={handletoleft}
              className="bg-white hover:bg-gray-200 transition-all h-5 w-5 shadow-md rounded-full flex justify-center items-center "
            >
              <FaAngleLeft size={18} />
            </button>
            <button
              onClick={handletoRight}
              className="bg-white h-5 w-5 hover:bg-gray-200 transition-all shadow-md rounded-full flex justify-center items-center"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="grid my-1">
          <div>
            <h2 className="text-[18px] font-semibold">Description</h2>
            <p className="text-[16px]">{data?.descreption}</p>
          </div>
          <div className="my-3">
            <h2 className="text-[18px] font-semibold">Unit</h2>
            <p className="text-sm">{data?.unit}</p>
          </div>
          {data?.more_details ? (
            <div className="">
              <p className="text-sm">
                {Object?.keys(data?.more_details).map((el, index) => (
                  <div className="" key={index}>
                    <p className="font-semibold">{el}</p>
                    <p className="text-[16px]">{data?.more_details[el]}</p>
                  </div>
                ))}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[16px] bg-green-300 rounded-full w-fit px-2">
          10 Min
        </p>
        <h1 className="text-[20px] md:text-[26px] font-bold px-1">
          {data?.name}
        </h1>
        <p className="capitalize text-[16px]">{data?.unit}</p>
        <Divider />
        <div className="pt-1 flex flex-col gap-1">
          <p className="text-[17px]">Price</p>
          <div className="flex gap-2 items-center">
            <button className="bg-green-50 border w-fit border-green-600 px-3 py-1.5 text-[15px] font-semibold mt-1 rounded-[5px]">
              {convertpriceTocurrency(
                pricewithdiscount(data?.price, data?.discount)
              )}
            </button>
            <p className="text-gray-600 font-semibold text-[16px] line-through">
              {convertpriceTocurrency(data?.price)}
            </p>
            <p className="font-semibold text-[20px] text-green-700">
              {data?.discount}%{" "}
              <span className=" text-gray-600 text-[16px]">Discount</span>
            </p>
          </div>
          {data?.stock === 0 ? (
            <p className="text-[14px] text-red-500 font-semibold">
              Out Of Stock
            </p>
          ) : (
          <AddTocartButton data={data}/>
          )}

          <p className="text-[16px] font-bold mt-2">Why Shop From Binkeyit ?</p>
          <div className="flex items-center gap-3">
            <img src={image1} className="h-16 w-16 rounded-full" />
            <p className="text-[15px]">
              <span className="font-bold text-[15px] block">
                Superfasr Delivery
              </span>
              ensures your order reaches you in record time! 🚀 With our
              efficient logistics and real-time tracking
            </p>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <img src={image2} className="h-16 w-16 rounded-full" />
            <p className="text-[15px]">
              <span className="font-bold text-[15px] block">
                Best Prices & Offers
              </span>
              enjoy unbeatable deals on every order! 💸 We bring you
              high-quality products at the most competitive prices, with
            </p>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <img src={image3} className="h-16 w-16 rounded-full" />
            <p className="text-[15px]">
              <span className="font-bold text-[15px] block">
                Wide Assortment
              </span>
              discover a vast range of products to suit every need and taste! 🛍️
              From everyday essentials to unique finds, we offer a diverse
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
