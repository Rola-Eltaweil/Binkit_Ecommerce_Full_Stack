import React, { useContext, useEffect } from "react";
import { Globalprovider } from "../components/provider/Globalprovider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Endpoints } from "../common/Endpoint";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";

const EditAddressDetails = ({ close, Addressdeatis }) => {
  const { fetchAddressuser } = useContext(Globalprovider);
  const { register, handleSubmit, reset } = useForm();
  

  const onSubmit = async (data) => {
   const payload = {
    ...data ,
    _id:Addressdeatis?._id
   }
    try {
      const edited = await axios.put(Endpoints.editAddress.url, payload, {
        withCredentials: true,
      }); 
      if (edited) {
        console.log(edited);
        toast.success(edited?.data?.message);
        close();
        fetchAddressuser();
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (Addressdeatis) {
      reset({
        address_line: Addressdeatis?.address_line,
        city: Addressdeatis?.city,
        state: Addressdeatis?.state,
        pincode: Addressdeatis?.pincode,
        country: Addressdeatis?.country,
        mobile: Addressdeatis?.mobile,
      });
    }
  }, [Addressdeatis]);

  return (
    <section className="fixed bg-neutral-900 bg-opacity-60 inset-0 flex justify-center px-2 ">
      <div className=" relative bg-white max-w-sm   rounded-sm w-full py-3 h-full max-h-[500px] lg:max-h-[580p] overflow-y-auto mt-[135px] lg:mt-24 mb-8">
        <IoClose
          onClick={close}
          size={23}
          className="absolute right-4  cursor-pointer  hover:text-red-600 transition-all"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 py-2 flex flex-col gap-2"
          noValidate
        >
          <div className="flex flex-col gap-1">
            <label className="text-[16px]">Address Line</label>
            <input
              type="text"
              id="address_line"
              {...register("address_line", {
                required: true,
              })}
              className="border-2 text-[16px]  border-gray-200 bg-blue-50  outline-none px-2 h-8 rounded-sm focus:border-primary-100"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px]">City</label>
            <input
              type="text"
              id="city"
              {...register("city", { required: true })}
              className="border-2  text-[16px] border-gray-200 bg-blue-50  outline-none px-2 h-8 rounded-sm focus:border-primary-100"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px]">State</label>
            <input
              type="text"
              id="state"
              {...register("state", { required: true })}
              className="border-2 text-[16px] border-gray-200 bg-blue-50  outline-none px-2 h-8 rounded-sm focus:border-primary-100"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px]">Pincode</label>
            <input
              type="number"
              id="pincode"
              {...register("pincode", {
                required: true,
                valueAsNumber: true,
              })}
              className="border-2 text-[16px] border-gray-200 bg-blue-50  outline-none px-2 h-8 rounded-sm focus:border-primary-100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[16px]">Country</label>
            <input
              type="text"
              id="country"
              {...register("country", { required: true })}
              className="border-2 text-[16px] border-gray-200 bg-blue-50  outline-none px-2 h-8 rounded-sm focus:border-primary-100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[16px]">Mobile No</label>
            <input
              type="number"
              id="mobile"
              {...register("mobile", {
                required: true,
                valueAsNumber: true,
              })}
              className="border-2 text-[16px] border-gray-200 bg-blue-50 outline-none px-2 h-8 rounded-sm focus:border-primary-100"
            />
          </div>

          <input
            type="submit"
            className="text-center cursor-pointer bg-primary-200 py-1.5 rounded-sm text-[16px] mt-2 font-semibold"
          />
        </form>
      </div>
    </section>
  );
};

export default EditAddressDetails;
