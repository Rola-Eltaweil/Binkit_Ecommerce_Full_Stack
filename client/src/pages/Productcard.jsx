import React, { useState } from 'react'
import OpenEditproduct from './OpenEditproduct';
import ConfirmBox from '../components/ConfirmBox';
import AxiosToastError from '../utils/AxiosToastError';
import axios from 'axios';
import { Endpoints } from '../common/Endpoint';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Productcard = ({data, fetchAllproducts}) => {
  const [openeditproduct, setopeneditproduct] = useState(false);
  const [handleDelete, sethandleDelete] = useState(false);
  const [productId, setproductId] = useState('');

  const HandleDelete =async()=>{
    try {
      const Deleteproduct = await axios.delete(
        `${Endpoints.Deleteproduct.url}/${productId}`,
         { withCredentials: true }
      );
      if(Deleteproduct){
        toast.success(Deleteproduct?.data?.message)
        close()
        fetchAllproducts()
    }
   } catch (error) {
      AxiosToastError(error)
      console.log(error)
    }
  }
  return (
    <div className="px-3 py-4">
        <div className="bg-blue-50 px-4 py-5 flex justify-center  flex-col max-w-[90%] mx-auto sm:max-w-64 ">
          <Link to={`/product/${data?._id}/${data?.name}`} >
            <div className="flex items-center justify-center mb-1">
              <img
                className="h-24 w-24 object-cover "
                src={data?.image[0]}
                alt={data?.image}
              />
            </div>

            <h2 className="text-[16px] font-semibold mt-1 line-clamp-1 text-left">
              {data?.name}
            </h2>
            <p className="line-clamp-2 text-[14px]  text-left">
              {data?.descreption}
            </p>
            <p className=" text-[14px]  font-semibold text-left">
              {data?.unit}
            </p>
          </Link>

          <div className="flex justify-between gap-3 items-center text-[16px] mt-2">
            <button
              onClick={() => setopeneditproduct(true)}
              className="border border-green-700 py-0.5 rounded-sm px-2 text-green-700 bg-green-200"
            >
              Edit
            </button>
            <button
              onClick={() => {
                sethandleDelete(true);
                setproductId(data?._id);
              }}
              className="border border-red-700 py-0.5 rounded-sm px-2 text-red-700 bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>

      {openeditproduct && (
        <OpenEditproduct
          fetchAllproducts={fetchAllproducts}
          close={() => setopeneditproduct(false)}
          products={data}
        />
      )}

      {handleDelete && (
        <ConfirmBox
          onclose={() => sethandleDelete(false)}
          onconfirm={HandleDelete}
        />
      )}
    </div>
  );
};

export default Productcard
