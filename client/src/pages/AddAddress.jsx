import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import AxiosToastError from "../utils/AxiosToastError";
import axios from "axios";
import { Endpoints } from "../common/Endpoint";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { Globalprovider } from "../components/provider/Globalprovider";

const AddAddress = ({ close }) => {
  const { fetchAddressuser } = useContext(Globalprovider);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const added = await axios.post(Endpoints.AddnewAddress.url, data, {
        withCredentials: true,
      });
      if (added) {
        console.log(added);
        toast.success(added?.data?.message);
        reset();
        close();
        fetchAddressuser();
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed bg-neutral-900 bg-opacity-60 inset-0 flex justify-center px-2 ">
      <div className=" relative bg-white max-w-sm rounded-sm w-full py-3 h-full max-h-[580px] overflow-y-auto mt-[135px] lg:mt-24 mb-8">
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

export default AddAddress;
