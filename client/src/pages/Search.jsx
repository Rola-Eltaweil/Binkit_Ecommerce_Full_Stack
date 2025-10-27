import React, { useEffect, useState } from 'react'
import Skeleton from '../components/Skeleton'
import AxiosToastError from '../utils/AxiosToastError'
import axios from 'axios'
import { Endpoints } from '../common/Endpoint'
import Productcard from './Productcard'
import Productcardcategory from './Productcardcategory'
import { useLocation } from 'react-router-dom'
import nothing from '../assets/nothing here yet.webp'
const Search = () => {
  const[loading,setloading]=useState(false)
  const [data,setdata]=useState([])
  const[totalpage,settotalpage]=useState(1)
  const[page,setpage]=useState(1)
  const params = useLocation()
  console.log(params)
  const search = params?.search.split('=')[1];

  useEffect(()=>{
    fetchsearch()
  },[page ,search])

  const fetchsearch =async()=>{
    try {
      setloading(true)
      const getdata = await axios.post(
        Endpoints.getproductsearch.url,
        { page: page, search: search },
        { withCredentials: true }
      );
      if(getdata){
        console.log(getdata)
        if(getdata?.data?.page === 1){
          setdata(getdata?.data?.data)
        }else{
          setdata((prev)=>{
            return [
              ...prev,
              ...getdata.data.data
            ]
          })
        }
        settotalpage(getdata?.data?.Totalpage);
      }
    } catch (error) {
      console.log(error)
      AxiosToastError(error)
    }finally{
      setloading(false)
    }
  }
  return (
    <section className="bg-white h-full min-h-screen ">
      <div className="container py-4">
        <p className="font-semibold text-[16px]">
          Search Result : {data?.length}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 my-2">
          {loading &&
            new Array(10).fill(null).map((_, index) => (
              <div key={index}>
                <Skeleton />
              </div>
            ))}

          {data?.map((item, index) => (
            <div key={index}>
              <Productcardcategory data={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center max-w-full h-full mx-auto  items-center">
        {data?.length === 0 && !loading ? (
        <div className='flex flex-col justify-center items-center gap-4'>
            <img src={nothing} alt={nothing} className="w-[400px] sm:max-w-sm" />
             <p className='font-medium text-[16px]'>No Data found</p>
        </div>
        ) : null}
      </div>
    </section>
  );
}

export default Search
