import React, { useEffect, useState } from 'react'
import AddSubcategory from './AddSubcategory'
import axios from 'axios'
import { Endpoints } from '../../common/Endpoint'
import AxiosToastError from '../../utils/AxiosToastError'
import {createColumnHelper} from '@tanstack/react-table'
import Table from '../../components/Tabel'
import ImageUrl from '../../components/ImageUrl'
const Subcategory = () => {
    const[openAddSubcategory,setopenAddSubcategory] =useState(false)
    const [ SubcategoryData ,setSubcategoryData] =useState([])
    const[imageURL,setimageURL]=useState('')
    const [openimageURL,setopenimageURL]=useState(false)
   const columnHelper = createColumnHelper()

    useEffect(()=>{
      fetchSubcategory()
    },[])
    const fetchSubcategory = async()=>{
      try {
         const getall = await axios.get(Endpoints.GetallSubcategory.url,{withCredentials:true})
         if(getall){
          console.log(getall)
           setSubcategoryData(getall?.data?.data)
         }
      } catch (error) {
        console.log(error)
        AxiosToastError(error)
      }
    }


    const column = [
      columnHelper.accessor('name',{
        header:'Name'
      }),
      columnHelper.accessor('image',{
        header:'Image',
        cell:({row})=>{
          return (
            <div className='flex justify-center items-center'>
              <img
                src={row.original.image}
                alt={row.original.image}
                className="w-10 h-7 object-cover cursor-pointer"
                onClick={()=>{
                  setimageURL(row.original.image);
                  setopenimageURL(true)
                }

                }
              />
            </div>
          );
        }
      }),
      columnHelper.accessor('category',{
        header:'Category',
        cell:({row})=>{
          console.log({row})
           return <p>{row.original.category.map((catname,index)=>(
              <p className='shadow-md w-fit px-2 py-0.5 text-[15px] bg-gray-50' key={index}>{catname?.name}</p>
           ))}</p>;
      
           
        }
      })
    ];
  return (
    <section className="h-[calc(100vh-200px)] overflow-auto">
      <div className="bg-white shadow-md w-full py-2 px-3  rounded-sm flex flex-col gap-2 sm:flex-row items-center justify-between pt-3">
        <h6 className="text-[17px] font-semibold"> Sub Category</h6>
        <button
          onClick={() => setopenAddSubcategory(true)}
          className="text-[15px]  rounded-[6px] hover:bg-primary-200 border border-primary-200 px-2 py-1 transition-all"
        >
          Add Sub Category
        </button>
      </div>

      {/* display Table subcategory */}
      <div className='overflow-auto'>
        <Table
          data={SubcategoryData}
          column={column}
          fetchSubcategory={fetchSubcategory}
        />
      </div>

      {imageURL && openimageURL && (
        <ImageUrl url={imageURL} close={() => setopenimageURL(false)} />
      )}

      {openAddSubcategory && (
        <AddSubcategory
          onclose={() => setopenAddSubcategory(false)}
          fetchSubcategory={fetchSubcategory}
        />
      )}
    </section>
  );
}

export default Subcategory
