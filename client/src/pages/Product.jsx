import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import axios from "axios";
import { Endpoints } from "../common/Endpoint";
import Loading from "../components/Loading";
import Productcard from "./Productcard";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const[page,setpage]=useState(1)
  const[totalNopage,settotalNopage]=useState()
  const[searchinput,setsearchinput] =useState('')
  useEffect(() => {
    fetchAllproducts();
  }, [page]);

  const fetchAllproducts = async () => {
    try {
      const getall = await axios.post(
        Endpoints.getallproduct.url,
        {limit:10  , page:page , search:searchinput},
        { withCredentials: true }
      );
      if (getall) {
        setloading(true);
        settotalNopage(getall?.data?.TotalpageNo);
        setproducts(getall?.data?.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };

  const handlePrevious = ()=>{
    if(page > 1) setpage(page-1)
  }

  const handleNext = () =>{
    if(page < totalNopage) setpage (page+1)
  }

  const handlechange = (e)=>{
   const {value} =e.target
   setsearchinput(value)
   setpage(1)
  }


  useEffect(()=>{
     let flag = true

     const interval = setTimeout(()=>{
      if(flag){
   fetchAllproducts();
          flag = false;

      }
      return ()=>clearTimeout(interval)
   
     },3000)
  },[searchinput])


  return (
    <section className="">
      <div className="bg-white shadow-md w-full py-2 px-3 rounded-sm flex flex-col gap-2 sm:flex-row items-center justify-between pt-3">
        <h6 className="text-[17px] font-semibold">Products</h6>
        <div className="flex items-center bg-blue-50 px-2 border border-gray-300 rounded-sm">
          <BsSearch
            className="bg-blue-50 cursor-pointer text-gray-500 h-8 "
            size={18}
          />

          <input
            value={searchinput}
            onChange={handlechange}
            type="text"
            className="bg-blue-50 outline-none   focus:border-primary-200 text-[15px] h-8 px-2"
            placeholder="Search Product here... "
          />
        </div>
      </div>

      {loading && (
        <div className=" pt-32">
          <Loading className="flex items-center justify-center" />
        </div>
      )}
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 ">
        {products?.map((product) => (
            <div key={product?._id}>
              <Productcard data={product} fetchAllproducts={fetchAllproducts} />
            </div>
        ))}
      </div>
      <div className="flex justify-between items-center p-4 ">
        <button
          disabled={page === 1}
          onClick={handlePrevious}
          className="text-[15px] transition-all border border-primary-200 bg-transparent hover:bg-primary-200 rounded-sm px-4 py-1"
        >
          Previous
        </button>
        <p className="bg-slate-100 w-full text-center text-[16px] py-1">
          {page} / {totalNopage}
        </p>
        <button
          disabled={totalNopage === page}
          onClick={handleNext}
          className="text-[15px] transition-all border border-primary-200 bg-transparent hover:bg-primary-200 rounded-sm px-4 py-1"
        >
          Next
        </button>
      </div>
    </section>
  );
};
export default Product;
