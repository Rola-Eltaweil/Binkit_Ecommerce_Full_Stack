import React, { useContext, useState } from "react";
import convertpriceTocurrency from "../utils/convertpriceTocurrency";
import { Globalprovider } from "../components/provider/Globalprovider";
import AddAddress from "./AddAddress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaCity,
  FaFlag,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaMapPin,
  FaPhoneAlt,
} from "react-icons/fa";
import AxiosToastError from "../utils/AxiosToastError";
import axios from "axios";
import { Endpoints } from "../common/Endpoint";
import toast from "react-hot-toast";

const Chaeckoutpage = () => {
  const {
    totalprice,
    totalpricewithnodiscount,
    quntity,
    fetchAllitemfromcart,
  } = useContext(Globalprovider);
  const [openAddAddress, setopenAddAddress] = useState(false);
  const Address = useSelector((state) => state?.address?.Addresses);
  const [selectedvalue, setselectdvalue] = useState(0);
  const cartItem = useSelector((state) => state?.cart?.cart);
  const navigate = useNavigate();

  const handlecashDelievery = async () => {
    try {
      console.log(selectedvalue, "dd");
      console.log(Address[selectedvalue]?._id, "dd");
      if (selectedvalue == null || !Address[selectedvalue]?._id) {
        return toast.error("Please choose your Address");
      }
      const cashpayment = await axios.post(
        Endpoints.PaymentCash.url,
        {
          delivery_address: Address[selectedvalue]._id,
          Total_amount: totalprice,
          items_list: cartItem,
          sub_Total_amount: totalprice,
        },
        { withCredentials: true }
      );

      if (cashpayment) {
        toast.success(cashpayment.data.message);
        fetchAllitemfromcart();
        navigate("/success", { state: "Order" });
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleonlinepayment = async () => {
    try {
      toast.loading("Loading ...");
      const payment = await axios.post(
        Endpoints.Paymentonline.url,
        {
          items_list: cartItem,
          Total_amount: totalprice,
          sub_Total_amount: totalprice,
          address_Id: Address[selectedvalue]?._id,
        },
        { withCredentials: true }
      );

      if (payment.data.url) {
        window.location.href = payment.data.url; // ✅ تحويل مباشر إلى صفحة الدفع
        fetchAllitemfromcart()
      } else {
        toast.error("Payment URL not found.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Check console for details.");
    }
  };

  return (
    <section className="container">
      <div className=" py-4 flex flex-col md:flex-row gap-3">
        <div className="flex-[2] ">
          <p className="font-bold text-[17px] mb-1 px-1">Choose Your Address</p>
          <div className="  max-h-[400px] overflow-y-auto">
            {Address?.map((address, index) => (
              <label htmlFor={`address ${index}`} key={index}>
                <div className="bg-white rounded-sm w-full p-2 cursor-pointer transition-all">
                  <div className="border border-gray-300 p-2 flex gap-3 hover:bg-blue-50 rounded-sm">
                    <div>
                      <input
                        id={`address ${index}`}
                        type="radio"
                        name="address"
                        value={index}
                        onChange={(e) => setselectdvalue(e.target.value)}
                      />
                    </div>
                    <div>
                      <p className="text-[16px] text-neutral-600 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary-200" />
                        {address?.address_line}
                      </p>
                      <p className="text-[16px] text-neutral-600 flex items-center gap-2">
                        <FaCity className="text-primary-200" />
                        {address?.city}
                      </p>
                      <p className="text-[16px] text-neutral-600 flex items-center gap-2">
                        <FaFlag className="text-primary-200" />
                        {address?.country}
                      </p>
                      <p className="text-[16px] text-neutral-600 flex items-center gap-2">
                        <FaGlobeAmericas className="text-primary-200" />
                        {address?.state}
                      </p>
                      <p className="text-[16px] text-neutral-600 flex items-center gap-2">
                        <FaMapPin className="text-primary-200" />
                        {address?.pincode}
                      </p>
                      <p className="text-[16px] text-neutral-600 flex items-center gap-2">
                        <FaPhoneAlt className="text-primary-200" />
                        {address?.mobile}
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div
            onClick={() => setopenAddAddress(true)}
            className="border-2 mt-2 cursor-pointer border-gray-300  border-dotted py-6 flex items-center justify-center rounded-sm"
          >
            <p className="text-[16px] font-semibold text-neutral-600">
              Add Address
            </p>
          </div>
        </div>
        <div className=" flex-[1]">
          <div className="bg-white py-4">
            <p className="font-extrabold text-[16px] mb-2 px-3">Summary</p>
            <div className="px-5">
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
            <div className="text-[16px]  flex flex-col px-3 mt-3">
              <button
                onClick={handleonlinepayment}
                className="bg-green-700 hover:bg-green-800 text-white transition-all py-1.5 rounded-sm"
              >
                Online Payment
              </button>
              <button
                onClick={handlecashDelievery}
                className="border border-green-700 text-green-800 mt-2 font-semibold hover:text-white hover:bg-green-700 transition-all py-1.5 rounded-sm"
              >
                cash on Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
      {openAddAddress && <AddAddress close={() => setopenAddAddress(false)} />}
    </section>
  );
};

export default Chaeckoutpage;
