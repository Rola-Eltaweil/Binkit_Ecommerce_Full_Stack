import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Globalprovider } from "./provider/Globalprovider";
import convertpriceTocurrency from "../utils/convertpriceTocurrency";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddTocartButton from "../pages/AddTocartButton";
import { pricewithdiscount } from "../utils/Pricewithdiscount";
import shopnow from "../assets/empty_cart.webp";
import toast from "react-hot-toast";
const DisplayViewcart = ({ close }) => {
  const { totalprice, totalpricewithnodiscount, quntity } =
    useContext(Globalprovider);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const handlecheckout = () => {
    if (user?._id) {
      navigate("/checkout");
      close()
    }else{
      toast('Please Login')
    }
  };
  return (
    <section className="top-0 left-0 right-0 bottom-0 fixed bg-neutral-900 bg-opacity-60 z-50">
      <div className="bg-white relative max-w-sm w-full ml-auto min-h-screen max-h-screen">
        <div className="bg-white shadow-md p-3 flex justify-between items-center gap-3 mb-2">
          <p className="text-[18px] font-semibold">Cart</p>
          <Link to={"/"} onClick={close}>
            <IoClose
              size={22}
              className="cursor-pointer hover:text-red-700 transition-all"
            />
          </Link>
        </div>
        {cart?.length > 0 ? (
          <>
            <div className="min-h-[90vh] max-h-[calc(100vh-200px)] px-3 h-full flex flex-col gap-5 bg-blue-50">
              <div className=" bg-blue-100 py-2 px-4 mt-2 rounded-full flex justify-between items-center">
                <p className="text-[15px] text-blue-500">Your Total Savings</p>
                <p className="text-[16px] text-blue-500">
                  {convertpriceTocurrency(
                    totalpricewithnodiscount - totalprice
                  )}
                </p>
              </div>

              <div className="bg-white max-h-[330px] overflow-y-auto h-full flex flex-col gap-1">
                {cart?.map((item, index) => (
                  <div
                    key={item?._id}
                    className="px-2 py-2 flex items-center gap-2"
                  >
                    <div className="border border-gray-200 rounded-sm w-fit p-2">
                      <img
                        className="h-12 w-12 object-cover "
                        src={item?.productId?.image[0]}
                      />
                    </div>
                    <div className="flex justify-between w-full items-center gap-2">
                      <div>
                        <p className="text-[15px] max-w-[100px] md:max-w-[200px]">
                          {item?.productId?.name}
                        </p>
                        <p className="text-[15px] capitalize text-gray-500 md:max-w-[200px]">
                          {item?.productId?.unit}
                        </p>
                        <p className="text-[15px] capitalize text-gray-500 md:max-w-[200px]">
                          {convertpriceTocurrency(
                            pricewithdiscount(item?.productId?.discount)
                          )}
                        </p>
                      </div>
                      <AddTocartButton data={item?.productId} />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="bg-white px-3 py-2">
                  <p className="text-[16px] font-bold">Bill details</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[16px]">items Total</p>
                    <div className="flex  items-center gap-2">
                      <p className="line-through text-[16px] text-gray-400">
                        {convertpriceTocurrency(totalpricewithnodiscount)}
                      </p>
                      <span className="text-[16px]">
                        {convertpriceTocurrency(totalprice)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <p className="text-[16px] font-normal">Quntity total</p>
                    <p className="text-[16px] font-normal">{quntity} items</p>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <p className="text-[16px] font-normal">Delivery charge</p>
                    <p className="text-[16px] font-normal">Free</p>
                  </div>
                  <div className="flex justify-between items-center gap-3 font-bold">
                    <p className="text-[16px] ">Grand total</p>
                    <p className="text-[16px] ">
                      {convertpriceTocurrency(totalprice)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-3 w-full left-0 px-3 ">
                <div className="bg-green-700 rounded-sm w-full px-2 py-3 text-white font-bold text-[16px] flex justify-between items-center sticky bottom-0 left-0">
                  {convertpriceTocurrency(totalprice)}
                  <button
                    onClick={handlecheckout}
                    className="flex items-center gap-1"
                  >
                    Proceed <FaCaretRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center flex-col">
            <img src={shopnow} alt={shopnow} className="p-4 " />
            <Link to={"/"} onClick={close} className="mx-auto">
              <button className="bg-green-700 w-fit  px-2 py-2 text-white text-[16px]">
                Shop now
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayViewcart;
