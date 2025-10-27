import React from 'react'
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Globalprovider } from "../../components/provider/Globalprovider";

const Order = () => {
  const order = useSelector((state)=>state?.order?.orders)
  const {fetchorders}=useContext(Globalprovider)
  return (
    <div className="bg-white">
      <div className="bg-white shadow-sm">
        <p className="text-[16px] py-2 px-3 font-semibold">Orders</p>
      </div>
      <div className="px-3 py-3 flex flex-col gap-3">
        {order.length === 0
          ? "No Orders here"
          : order.map((order) => (
              <div key={order._id}>
                <p className="text-[14px] text-neutral-800">
                  Order No: ORD-{order._id}
                </p>
                <div className="flex items-start mt-1 gap-2 ">
                  <img
                    className="h-12 w-12"
                    src={order?.product_details?.image}
                    alt="order"
                  />
                  <p className="text-[16px] text-neutral-800">
                    {order.product_details?.name}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
  

}

export default Order
