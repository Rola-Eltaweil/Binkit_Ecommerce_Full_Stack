import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { Endpoints } from "../common/Endpoint";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ImageUrl from "../components/ImageUrl";
import AddFeild from "./Product/AddFeild";

const OpenEditproduct = ({ close, products, fetchAllproducts }) => {
  const [loading, setloading] = useState(false);
  const [ImageURL, setImageURL] = useState("");
  const [openIamge, setopenImage] = useState(false);
  const category = useSelector((state) => state.category.categories);
  const Subcategory = useSelector((state) => state.category.subcategory);
  const [openAddFeilds, setopenAddFeilds] = useState(false);
  const [FiledName, setFiledName] = useState("");
  const [data, setdata] = useState({
    name: "",
    image: [],
    Category: [],
    Subcategorey: [],
    price: "",
    unit: "",
    stock: "",
    discount: 0,
    descreption: "",
    more_details: {},
    publish: false,
    _id: products?.data?._id || "",
  });

  useEffect(() => {
    setdata({
      _id: products?._id || "",
      name: products?.name || "",
      image: products?.image || [],
      Category: products?.Category || [],
      Subcategorey: products?.Subcategorey || [],
      price: products?.price || "",
      unit: products?.unit || "",
      stock: products?.stock || "",
      discount: products?.discount || 0,
      descreption: products?.descreption || "",
      more_details: products?.more_details || {},
      publish: products?.publish || false,
    });
  }, []);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddFeild = () => {
    setdata((prev) => ({
      ...prev,
      more_details: {
        ...prev.more_details,
        [FiledName]: "",
      },
    }));
    setFiledName("");
    setopenAddFeilds(false);
  };

  const handlechangeImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select image");
    }
    const formdata = new FormData();
    formdata.append("image", file);
    try {
      setloading(true);
      const response = await axios.put(
        Endpoints.UploadImageproduct.url,
        formdata,
        { withCredentials: true }
      );
      if (response) {
        console.log(response, "ooo");
        setdata((prev) => ({
          ...prev,
          image: [...prev.image, response.data.data[0].image],
        }));
      }
    } catch (error) {
      toast.error("The size of photo is too large");
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const updated = await axios.put(Endpoints.updateproduct.url, data, {
        withCredentials: true,
      });
      if (updated) {
        console.log(updated);
        toast.success(updated?.data?.message);
        close();
        fetchAllproducts()
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };
  const handleDeleteCategory = (index) => {
    data.Category.splice(index, 1);
    setdata((prev) => ({
      ...prev,
    }));
  };

  const handleDeleteSubCategory = (index) => {
    data?.Subcategorey?.splice(index, 1);
    setdata((prev) => ({
      ...prev,
    }));
  };

  const handleDelete = (index) => {
    data.image.splice(index, 1);
    setdata((prev) => {
      return {
        ...prev,
      };
    });
  };

  return (
    <section className="top-0 right-0 bottom-0 left-0 bg-neutral-900 bg-opacity-60 fixed flex justify-center ">
      <div className="bg-white max-w-xl w-full overflow-auto  mt-[90px] max-h-[85vh]">
        <div className="bg-white shadow-md w-full py-2 px-3 rounded-sm flex flex-col gap-2 sm:flex-row items-center justify-between ">
          <h6 className="text-[17px] font-semibold">Upload Product</h6>
          <button onClick={close}>
            <IoClose size={20} className="hover:text-red-700 transtion-alll" />
          </button>
        </div>
        <div>
          <form
            className="px-3 py-4 flex flex-col gap-1"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label className="text-[16px] ">Name</label>
              <input
                placeholder="Enter product Name"
                value={data?.name}
                name="name"
                required
                onChange={handlechange}
                type="text"
                className="w-full resize-none py-1.5 text-[15px] px-2 outline-none border  border-gray-200 focus:border-primary-100  bg-blue-50 rounded-sm "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[16px] ">Descreption</label>
              <textarea
                placeholder="Enter product Descreption"
                value={data?.descreption}
                required
                name="descreption"
                onChange={handlechange}
                type="text"
                className="w-full resize-none py-1 text-[15px] px-2 outline-none border  border-gray-200 focus:border-primary-100  bg-blue-50 rounded-sm "
              />
            </div>

            <div>
              <label className="text-[16px]">Image</label>
              <div className="w-full bg-blue-50 border border-gray-200 h-[110px] rounded-sm mt-1">
                {!loading ? (
                  <label htmlFor="uploadImage">
                    <div className="flex flex-col  items-center justify-center h-full cursor-pointer">
                      <FaCloudUploadAlt className="" size={32} />
                      <p className="text-[15px]">Upload Image</p>
                    </div>

                    <input
                      name="image"
                      onChange={handlechangeImage}
                      id="uploadImage"
                      className="hidden"
                      type="file"
                    />
                  </label>
                ) : (
                  <Loading />
                )}
              </div>
              <div className="flex flex-wrap  gap-2 cursor-pointer mb-4">
                {data?.image &&
                  data?.image?.map((img, index) => (
                    <div className="border relative border-gray-200 group rounded-sm mt-3 flex justify-center items-center h-[100px] w-[100px] ">
                      <img
                        onClick={() => {
                          setopenImage(true);
                          setImageURL(img);
                        }}
                        className="h-full w-full rounded-sm object-fill "
                        key={index}
                        src={img}
                        alt={img}
                      />
                      <div className="bg-red-500 rounded-tl-lg  p-0.5 absolute bottom-0 right-0 hidden group-hover:flex transition-all ">
                        <MdDelete
                          className=" text-white"
                          size={21}
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {ImageURL && openIamge && (
              <ImageUrl close={() => setopenImage(false)} url={ImageURL} />
            )}

            <div className="flex flex-col mt-1 gap-1">
              <label className="text-[16px]">Category</label>
              <select
                value={data.Category[0]?._id || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const findeone = category.find((el) => el._id === value);
                  setdata((prev) => ({
                    ...prev,
                    Category: [...prev.Category, findeone],
                  }));
                }}
                className="w-full  resize-none py-2 text-[15px] px-2 outline-none border  border-gray-200 focus:border-primary-100  bg-blue-50 rounded-sm "
              >
                <option>Select _ Category</option>

                {category?.map((cat, index) => (
                  <option value={cat?._id} key={index + 1}>
                    {cat?.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-1 items-center">
                {data?.Category &&
                  data?.Category?.map((cat, index) => (
                    <div key={index} className="flex gap-2 mt-1">
                      <p className="bg-blue-50 text-[14px] rounded-lg px-2 py-0.5 flex gap-1 items-center">
                        {cat?.name}{" "}
                        <IoClose
                          onClick={() => handleDeleteCategory(index)}
                          className="cursor-pointer hover:text-red-600"
                          size={15}
                        />
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="">
              <label className="text-[16px]">Sub Category</label>
              <div>
                <select
                  value={data?.Subcategorey[0]?._id || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const findeone = Subcategory.find((el) => el._id === value);
                    setdata((prev) => ({
                      ...prev,
                      Subcategorey: [...prev.Subcategorey, findeone],
                    }));
                  }}
                  className="w-full  resize-none py-2 text-[15px] px-2 outline-none border  border-gray-200 focus:border-primary-100  bg-blue-50 rounded-sm "
                >
                  <option>Select _ Subcategory</option>
                  {Subcategory?.map((subcat, index) => (
                    <option value={subcat?._id} key={index}>
                      {subcat?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-1 items-center">
                {data?.Subcategorey &&
                  data?.Subcategorey?.map((Subcat, index) => (
                    <div key={index} className="flex gap-2 mt-1">
                      <p className="bg-blue-50 text-[14px] rounded-lg px-2 py-0.5 flex gap-1 items-center">
                        {Subcat?.name}{" "}
                        <IoClose
                          onClick={() => handleDeleteSubCategory(index)}
                          className="cursor-pointer hover:text-red-600"
                          size={15}
                        />
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[16px] ">unit</label>
              <input
                placeholder="Enter product unit"
                value={data?.unit}
                name="unit"
                required
                onChange={handlechange}
                type="text"
                className="w-full resize-none py-1.5 text-[15px] px-2 outline-none border  border-gray-200 focus:border-primary-100  bg-blue-50 rounded-sm "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[16px] ">Number Of Stock</label>
              <input
                placeholder="Enter product stock"
                type="number"
                value={data?.stock}
                name="stock"
                required
                onChange={handlechange}
                className="w-full resize-none py-1.5 text-[15px] px-2 outline-none border  border-gray-200 focus:border-primary-100  bg-blue-50 rounded-sm "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[16px] ">Price</label>
              <input
                type="number"
                value={data?.price}
                name="price"
                placeholder="Enter product price"
                required
                onChange={handlechange}
                className="w-full resize-none py-1.5 text-[15px] px-2 outline-none border  border-gray-200 focus:border-primary-100  bg-blue-50 rounded-sm "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[16px] ">Discount</label>
              <input
                placeholder="Enter product Discount"
                type="number"
                value={data?.discount}
                name="discount"
                required
                onChange={handlechange}
                className="w-full resize-none py-1.5 text-[15px] px-2 outline-none border  border-gray-200 focus:border-primary-100  bg-blue-50 rounded-sm "
              />
            </div>

            {/* display field when click add feild  */}
            {Object?.keys(data?.more_details)?.map((k, index) => {
              return (
                <div key={index} className="flex flex-col gap-1">
                  <label className="text-[16px] " htmlFor={k}>
                    {k}
                  </label>
                  <input
                    value={data?.more_details[k]}
                    required
                    onChange={(e) => {
                      const value = e.target.value;
                      setdata((prev) => ({
                        ...prev,
                        more_details: {
                          ...prev.more_details,
                          [k]: value,
                        },
                      }));
                    }}
                    type="text"
                    className="w-full resize-none py-1.5 text-[15px] px-2 outline-none border  border-gray-200 focus:border-primary-100  bg-blue-50 rounded-sm "
                  />
                </div>
              );
            })}

            <button
              onClick={() => setopenAddFeilds(true)}
              type="button"
              className="bg-primary-100 text-[14px] font-semibold rounded-sm px-4 mt-2 py-1.5 w-fit hover:bg-transparent hover:border transition-all hover:border-primary-200"
            >
              Add Feilds
            </button>

            <button
              type="submit"
              className="w-full text-center py-2 bg-primary-100 hover:bg-primary-200 transition-all mt-2 rounded-sm text-[16px] font-semibold"
            >
              Update
            </button>
          </form>
        </div>
        {openAddFeilds && (
          <AddFeild
            submit={handleAddFeild}
            value={FiledName}
            onchange={(e) => setFiledName(e.target.value)}
            onclose={() => setopenAddFeilds(false)}
          />
        )}
      </div>
    </section>
  );
};

export default OpenEditproduct;
