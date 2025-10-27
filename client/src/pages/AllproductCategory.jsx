import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Endpoints } from "../common/Endpoint";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from '../components/Loading'
import Productcardcategory from '../pages/Productcardcategory'
import nothing from '../assets/nothing here yet.webp'
import { setcategories } from "../Redux/feature/categorySlice";

const AllproductCategory = () => {
  const params = useParams();
  const catId = params?.categoryId;
  const subcatId = params?.subcategoryID;
  const categoryId = params?.categoryId;
  const categorynameparams = params?.categoryname;

  const[loading,setloading]=useState(false)
  const[page,setpage]=useState(1)
  const[data,setdata]=useState([])
  const[Totalpage,setTotalpage]=useState(1)
  const[datasubcategory,setdatasubcategory] =useState([])
  const subcategory = useSelector((state) => state.category.subcategory);
  const categoryname = params.subcategoryname;
  const dispatch = useDispatch()


useEffect(() => {
  if (subcategory?.length > 0 && subcatId) {
    fetchproductbysubcategory();
  }
}, [subcategory, subcatId ,params]);


  useEffect(()=>{
    const sub = subcategory.filter((sub)=>{
      const filterdata = sub?.category?.some((el) => {
        return el._id == categoryId;
      });
      return filterdata ? filterdata :null
    })
    setdatasubcategory(sub);
  },[subcategory , params])
  


  const fetchproductbysubcategory = async () => {
    try {
      setloading(true)
      const getall = await axios.post(
        Endpoints.getproductbycategoryandsubcategory.url,
        {
          cattegoryId: catId,
          subcategoryId: subcatId,
          limit: 8,
        },
        { withCredentials: true }
      );
      setdata(getall?.data?.data)
      setTotalpage(getall?.data?.Alldatacount);

    } catch (error) {
      AxiosToastError(error);
    }finally{
       setloading(false)
    }
  };


  return (
    <section className="sticky top-24 lg:top-20 max-h-[80vh] min-h-[80vh] overflow-hidden">
      <div className="grid grid-cols-[110px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr] max-w-[93%] mx-auto w-full sticky ">
        {/* display subcategory  */}
        <div className=" min-h-[80vh] max-h-[80vh] sticky flex flex-col gap-1 lg:gap-0  overflow-y-scroll  scrollbar-custom">
          {datasubcategory?.map((subcategory) => (
            <Link
              to={`/product/${categorynameparams}/${catId}/${subcategory?.name}/${subcategory?._id}`}
              className={`cursor-pointer hover:bg-green-100 transition-all flex flex-col lg:flex-row lg:gap-2 gap-3  items-center  justify-center  shadow-md  ${
                subcatId === subcategory?._id ? "bg-green-100" : "bg-white"
              } p-3 lg:border`}
              key={subcategory?._id}
            >
              <img
                src={subcategory?.image}
                alt={subcategory?.image}
                className=" h-[100px] lg:h-12 lg:w-12 w-[100px]   "
              />
              <p className="text-[13px] md:text-[16px] whitespace-nowrap pb-0 font-medium text-left">
                {subcategory?.name}
              </p>
            </Link>
          ))}
        </div>

        {/* display product  */}
        <div className="min-h-[80vh] max-h-[80vh] overflow-auto ">
          <div className="bg-white shadow-md p-3">
            <p className="font-semibold text-[15px] sm:text-[18px]">
              {categoryname}
            </p>
          </div>
          <div className="h-full">
            <div className="grid grid-cols-1 p-3 md:grid-cols-2 lg:grid-cols-3 gap-3 2xl:grid-cols-4">
              {data?.map((product) => (
                <div key={product?._id} className="">
                  <Productcardcategory data={product} />
                </div>
              ))}
            </div>

            {data?.length === 0 && (
              <div className="flex items-center justify-center">
                <img
                  className="max-h-[400px] max-w-[400px] object-fill hidden sm:flex "
                  src={nothing}
                  alt={nothing}
                />
                <p className="flex sm:hidden  pt-24 text-[16px]">
                  No Data here ...
                </p>
              </div>
            )}

            {loading && (
              <div className="flex justify-center items-center h-full">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllproductCategory;
