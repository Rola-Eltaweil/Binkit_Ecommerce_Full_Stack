import axios from "axios";
import React, { useState } from "react";
import { Endpoints } from "../../common/Endpoint";
import toast from "react-hot-toast";
import AxiosToastError from "../../utils/AxiosToastError";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

const EditSubcategory = ({ data, onclose, fetchSubcategory }) => {
  const [loading, setloading] = useState(false);
  const [subcategorydata, setsubcategorydata] = useState({
    name: data.name,
    image: data.image,
    category: data.category || [],
    _id: data?._id,
  });
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setsubcategorydata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setloading(true);

      const EditSubcategory = await axios.put(
        Endpoints.updateSubcategory.url,
        subcategorydata,
        { withCredentials: true }
      );
      if (EditSubcategory) {
        console.log(EditSubcategory);
        toast.success(EditSubcategory.data.message);
        onclose();
        setsubcategorydata({
          name: "",
          image: "",
          category: [],
        });
        fetchSubcategory()
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
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
      const uploaded = await axios.put(Endpoints.uploadimage.url, formdata, {
        withCredentials: true,
      });
      console.log(uploaded, "image sub");
      setloading(false);
      if (uploaded) {
        setsubcategorydata((prev) => ({
          ...prev,
          image: uploaded?.data?.data?.image,
        }));
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  const deleteoncategory = (id) => {
    setsubcategorydata((prev) => ({
      ...prev,
      category: prev.category.filter((el) => el._id !== id),
    }));
  };
  const datacategory = useSelector((state) => state.category.categories);

  return (
    <section className="inset-0 bg-neutral-900 bg-opacity-60 fixed z-50 flex items-center justify-center  ">
      <div className="bg-white max-w-xl w-full p-3 rounded-sm">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-semibold mt-2"> Edit Sub Category</p>
          <IoClose size={24} onClick={onclose} className="cursor-pointer" />
        </div>
        <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
          <div className="mt-3">
            <label className="text-[16px] block mb-1">Name</label>
            <input
              name="name"
              value={subcategorydata?.name}
              id="categoryName"
              placeholder="Enter category name"
              onChange={handleonchange}
              className="text-[16px] w-full border border-gray-200 bg-blue-50 focus:border-primary-200 p-2 outline-none rounded-md"
            />
          </div>

          <div className="flex items-center  w-full ">
            <div className=" ">
              <p className="text-[16px]">Image</p>
              {subcategorydata?.image ? (
                <div className=" border  border-gray-300 rounded-md w-[200px]  h-[180px] mt-1 flex items-center justify-center">
                  <img
                    src={subcategorydata?.image}
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
                subcategorydata?.name
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
                disabled={!subcategorydata?.name}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-1 ">
            <label className="text-[16px]">Select Category</label>
            <div className="border border-primary-200 ">
              {/* display value  */}
              <div className="flex flex-row flex-wrap gap-3 p-3.5 ">
                {subcategorydata?.category?.map((cat, index) => (
                  <div key={index}>
                    <p className="text-[14px] flex gap-1  bg-white  shadow-sm outline-none border border-gray-200   p-2  ">
                      {cat?.name}
                      <button
                        type="button"
                        className=" "
                        onClick={() => deleteoncategory(cat?._id)}
                      >
                        <IoClose className="text-red-600" />
                      </button>
                    </p>
                  </div>
                ))}
              </div>

              {/* select category  */}
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  const categoeyDetails = datacategory.find(
                    (el) => el._id == value
                  );
                  setsubcategorydata((preve) => ({
                    ...preve,
                    category: [...preve.category, categoeyDetails],
                  }));
                }}
                className=" outline-none border text-[16px] w-full border-gray-200   p-2  "
              >
                <option value="">-- Select Category --</option>

                {datacategory?.map((category, index) => (
                  <option
                    value={category?._id}
                    key={index}
                    className="py-1
                          "
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className=" bg-primary-200 hover:bg-primary-100 flex justify-center py-1.5 rounded-sm mt-2  ">
            <button type="submit" className="text-[16px] font-semibold">
              update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditSubcategory;
