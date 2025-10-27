import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../../utils/AxiosToastError";
import { Endpoints } from "../../common/Endpoint";
import { useDispatch, useSelector } from "react-redux";
import { setcategories } from "../../Redux/feature/categorySlice";

const OpenAddCategory = ({ close, Getcategories }) => {
  const dispatch = useDispatch();
const categories = useSelector((state) => state.category.categories);

  const [data, setdata] = useState({
    name: "",
    image: "",
  });

  const [loading, setloading] = useState(false);

  const handleonchange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlechangeImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        toast.error("please select image for category");
      }
      const formdata = new FormData();
      formdata.append("image", file);
      setloading(true);
      const response = await axios.put(Endpoints.uploadedImage.url, formdata, {
        withCredentials: true,
      });
      setloading(false);

      if (response) {
        setdata((prev) => ({
          ...prev,
          image: response?.data?.data?.image,
        }));
      }
      
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setloading(true);
      const createone = await axios.post(Endpoints.Addcategory.url, data, {
        withCredentials: true,
      });
      if (!createone) {
        console.log("error");
        return;
      }
      toast.success(createone?.data?.message);
      setdata({
        name: "",
        image: "",
      });
      close();
      dispatch(setcategories([...categories, createone?.data?.data]));
      Getcategories()
    } catch (error) {
      console.log(error);
      AxiosToastError();
    } finally {
      setloading(false);
    }
  };

  const checkform = data?.image && data?.name;

  return (
    <section className="top-0 bottom-0 right-0 left-0 bg-neutral-800 bg-opacity-50 fixed flex items-center justify-center">
      <div className="bg-white  max-w-3xl w-full px-3 py-5 rounded-md ">
        <div className=" flex items-center justify-between">
          <p className="text-[16px] font-semibold">Category</p>
          <IoClose className="cursor-pointer" onClick={close} />
        </div>
        <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
          <div className="mt-3">
            <label className="text-[16px] block mb-1">Name</label>
            <input
              name="name"
              value={data?.name}
              id="categoryName"
              placeholder="Enter category name"
              onChange={handleonchange}
              className="text-[16px] w-full border border-gray-200 bg-blue-50 focus:border-primary-200 p-2 outline-none rounded-md"
            />
          </div>

          <div className="flex items-center  w-full ">
            <div className=" ">
              <p className="text-[16px]">Image</p>
              {data?.image ? (
                <div className=" border  border-gray-300 rounded-md w-[200px]  h-[180px] mt-1 flex items-center justify-center">
                  <img
                    src={data?.image}
                    className="h-full w-full object-scale-down "
                  />
                </div>
              ) : (
                <div className="bg-blue-50 border  border-gray-300 rounded-md w-[200px]  h-[180px] mt-1 flex items-center justify-center">
                  {loading ? (
                    <p className="text-[16px] text-gray-400 font-medium">
                      Loading ...
                    </p>
                  ) : (
                    <p className="text-[16px] text-gray-400 font-medium">
                      No Image ...
                    </p>
                  )}
                </div>
              )}
            </div>
            <div
              className={` mt-8 mx-3 rounded-sm  ${
                data?.name
                  ? `border border-primary-200 hover:bg-primary-200`
                  : `bg-gray-400`
              }`}
            >
              <label htmlFor="uploadImage">
                <div className={`text-[16px]  px-2 py-1.5 cursor-pointer `}>
                  {loading ? "Loading" : "  Upload Image"}
                </div>
              </label>

              <input
                onChange={handlechangeImage}
                type="file"
                id="uploadImage"
                disabled={!data?.name}
                className="hidden"
              />
            </div>
          </div>

          <div
            className={`${
              !checkform ? `bg-gray-400` : `bg-primary-200`
            } flex justify-center py-1.5 rounded-sm mt-2`}
          >
            <button
              type="submit"
              disabled={!checkform}
              className="text-[16px] font-semibold"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OpenAddCategory;
