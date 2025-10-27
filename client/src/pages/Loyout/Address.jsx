import React, { useContext, useState } from "react";
import { Globalprovider } from "../../components/provider/Globalprovider";
import { useSelector } from "react-redux";
import {
  FaCity,
  FaFlag,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaMapPin,
  FaPhoneAlt,
} from "react-icons/fa";
import AddAddress from "../AddAddress";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from "../EditAddressDetails";
import AxiosToastError from "../../utils/AxiosToastError";
import axios from "axios";
import { Endpoints } from "../../common/Endpoint";
import toast from "react-hot-toast";

const Address = () => {
  const [openAddAddress, setopenAddAddress] = useState(false);
  const {fetchAddressuser}=useContext(Globalprovider)
  const Address = useSelector((state) => state?.address?.Addresses);
  const [editAddressDetails, seteditAddressDetails] = useState(false);
  const [Addressdeatis, setAddressdeatis] = useState(null);

  const deltedaddress = async (id) => {
    try {
      const delted = await axios.delete(Endpoints.deltedAddress.url, {
        data: { _id: id },
        withCredentials: true,
      });
      if (delted) {
        toast.success(delted?.data?.message)
        fetchAddressuser()
      }
    } catch (error) {
      AxiosToastError(error);
      console.log(error);
    }
  };
  return (
    <section className="py-2 px-2 bg-blue-50">
      <div className="  flex flex-col md:flex-row">
        <div className="flex-[2] ">
          <div className="bg-white mb-2 mt-1 shadow-md py-1.5 flex justify-between items-center gap-3 px-3">
            <p className="font-bold text-[17px] mb-1 px-1">Address</p>
            <button
              onClick={() => setopenAddAddress(true)}
              className="border border-primary-200 rounded-full text-[15px] text-primary-200 px-2 py-0.5 hover:bg-primary-200 hover:text-black transition-all"
            >
              Add Address
            </button>
          </div>
          <div className="grid gap-4 ">
            {Address?.map((address, index) => (
              <div
                key={index}
                className="border bg-white shadow-sm p-2 flex justify-between  gap-3 rounded-sm"
              >
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

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      seteditAddressDetails(true);
                      setAddressdeatis(address);
                    }}
                    className="bg-green-100 hover:bg-green-600 p-0.5 rounded-sm hover:text-white transition-all"
                  >
                    <MdEdit />
                  </button>

                  <button
                    onClick={() => {
                      deltedaddress(address?._id);
                    }}
                    className=" bg-red-100 hover:bg-red-600 p-0.5 rounded-sm hover:text-white
                transition-all"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
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
      </div>
      {openAddAddress && <AddAddress close={() => setopenAddAddress(false)} />}
      {editAddressDetails && (
        <EditAddressDetails
          close={() => seteditAddressDetails(false)}
          Addressdeatis={Addressdeatis}
        />
      )}
    </section>
  );
};

export default Address;
