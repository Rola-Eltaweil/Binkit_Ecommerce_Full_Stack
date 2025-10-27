import React, { useMemo } from "react";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import convertpriceTocurrency from "../utils/convertpriceTocurrency";
import { pricewithdiscount } from "../utils/Pricewithdiscount";
import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartItemmobile = () => {
  const cartItem = useSelector((state) => state?.cart?.cart);

  console.log(cartItem, "cartitem");

  const totalprice = useMemo(() => {
    const total = cartItem.reduce((prev, curr) => {
      const price = Number(curr?.productId?.price) || 0;
      const discount = Number(curr?.productId?.discount) || 0;
      const quantity = Number(curr?.quantity) || 0;

      const finalprice = pricewithdiscount(price, discount) * quantity;
      return prev + finalprice;
    }, 0);

    return convertpriceTocurrency(total);
  }, [cartItem]);


  const totalquantity = useMemo(() => {
    return cartItem.reduce((prev,curr)=>{
      return  prev + Number(curr?.quantity);
    },0)
  }, [cartItem]);


  return (
    <div className=" sticky bottom-0 z-10 flex lg:hidden w-full">
      <div className="bg-green-600 p-1.5 flex items-center  justify-between gap-3 w-full">
        <div className="flex gap-3 items-center">
          <div className="px-2 bg-green-500 p-1 rounded-sm">
            <BsCart4 size={26} className="text-white" />
          </div>
          {cartItem?.length > 0 ? (
            <div>
              <p className="text-white font-semibold text-[15px]">
                {totalquantity} items
              </p>
              <p className="text-white font-semibold text-[15px]">
                {totalprice}
              </p>
            </div>
          ) : (
            <div className="">
              <p className="text-white font-semibold text-[15px]">my cart</p>
            </div>
          )}
        </div>

          <Link to="/cart">
            <span className="text-[16px] font-semibold text-white flex items-center gap-1">
              View cart
              <FaCaretRight size={20} />
            </span>
          </Link>
      </div>
    </div>
  );
};

export default CartItemmobile;
