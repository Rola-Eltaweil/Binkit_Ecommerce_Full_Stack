import React from "react";
import banner from "../assets/banner (1).jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import {  useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import ProductCategorywise from "./ProductCategorywise";

const Home = () => {
  const loadingcategory = useSelector(
    (state) => state.category.loadingcategory
  );

  const catgeory = useSelector((state) => state?.category?.categories);
  const subcategory = useSelector((state) => state?.category?.subcategory);
  const navigate = useNavigate();

  const handleRedirectproductpage = (id, cat) => {
    const subcategories = subcategory.find((sub) => {
      const filterationsub = sub.category.some((el) => el?._id === id);

      return filterationsub ? true : null;
    });
    const url = `/product/${cat}/${id}/${subcategories?.name}/${subcategories?._id}`;

    navigate(url);
  };

  return (
    <section className={!banner ? "bg-blue-50" : "bg-white"}>
      <div
        className={
          !banner
            ? "bg-blue-100 rounded-sm mt-4 mb-4 animate-pulse max-w-[90%] h-[250px] mx-auto"
            : null
        }
      >
        <img
          src={banner}
          alt={banner}
          className="max-w-[95%] h-[320px] mx-auto lg:flex hidden"
        />

        <img
          src={bannerMobile}
          alt={bannerMobile}
          className="w-full h-[300px] sm:h-[400px] mx-auto flex lg:hidden object-fill"
        />
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 xl:grid-cols-10 max-w-[94%]  w-full mx-auto ">
        {loadingcategory &&
          new Array(12).fill(null).map((cat, index) => (
            <div
              key={index}
              className="shadow-md rounded-sm p-3 grid grid-cols-1 gap-2 animate-pulse"
            >
              <div className="bg-blue-100 h-[120px]  w-full rounded-sm"></div>
              <div className="bg-blue-100 h-8 w-full rounded-sm"></div>
            </div>
          ))}

        {catgeory?.map((cat) => (
          <div
            key={cat?._id}
            onClick={() => handleRedirectproductpage(cat?._id, cat?.name)}
            className="cursor-pointer"
          >
            <img
              className="object-cover"
              src={cat?.image}
            />
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[92%]  py-6">
        <div className="grid grid-cols-1 gap-3">
          {catgeory?.map((cat) => (
            <div key={cat?._id}>
              <div className="flex items-center justify-between">
                <p className=" text-[18px]  md:text-[21px] font-semibold md:font-bold">
                  {cat?.name}
                </p>

                  <p onClick={() => handleRedirectproductpage(cat?._id ,cat?.name)} className="text-[16px] text-green-700 cursor-pointer hover:text-green-800">
                    See All
                  </p>
              </div>
              <div className="">
                <ProductCategorywise categoryId={cat?._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
