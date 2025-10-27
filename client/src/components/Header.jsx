import React, { useContext, useEffect, useMemo, useState } from 'react'
import logo from '../assets/logo (4).png'
import SearchInput from './SearchInput';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import MenuAccount from './menuAccount';
import UseMobileuser from '../Hooks/UseMobileUser';
import MenuAccountmobile from './MenuAccountmobile';
import convertpriceTocurrency from '../utils/convertpriceTocurrency';
import { pricewithdiscount } from '../utils/Pricewithdiscount';
import DisplayViewcart from './DisplayViewcart';


const Header = () => {
  const [IsmobileUser] = UseMobileuser();
  const location = useLocation()
  const Issearchpage = location.pathname === "/Search"
  const user = useSelector((state)=>(state?.user))
 const[open,setopen]=useState(false)
 const[openmobile,setopenmobile]=useState(false)
 const[quntity ,setquntity]=useState(null)
 const[totalprice,settotalprice]=useState(null)
 const cart = useSelector((state)=>state.cart.cart)
 const[opencart,setopencart]=useState(false)
 const navigate = useNavigate()


 const handleCloseMenue = ()=>{
  setopen(false)
 }

 const handleclick = ()=>{
   if(!user?._id){
   return navigate('/login')
   }
   navigate('/user')
 }

useEffect(()=>{
 const qty = cart.reduce((prev,curr)=>{
  return prev + curr.quantity;
 },0)
   setquntity(qty);
   const totalqty = cart.reduce((prev,curr)=>{
    return (
      prev +
      pricewithdiscount(curr?.productId?.price , curr?.productId?.discount) * Number(curr?.quantity)
    );
   },0)
   settotalprice(totalqty)
},[cart])




  return (
    <div className="max-h-[120px] w-full  py-3 border  sticky top-0 z-50 shadow-md bg-white ">
      {!(IsmobileUser && Issearchpage) && (
        <div className="flex justify-between items-center container ">
          <Link to="/">
            <img src={logo} alt="logo" className="h-9 max-w-full" />
          </Link>
          <div className="w-[30%] lg:block hidden">
            <SearchInput />
          </div>

          {/* for desktop view  */}
          <div className="lg:flex items-center gap-8 hidden relative">
            {user?._id ? (
              <div className="flex gap-2 items-center">
                <p className="text-[16px]">Account</p>
                {!open ? (
                  <TiArrowSortedDown
                    size={18}
                    className="mt-0.5 cursor-pointer"
                    onClick={() => setopen((prev) => !prev)}
                  />
                ) : (
                  <TiArrowSortedUp
                    onClick={() => setopen((prev) => !prev)}
                    size={18}
                    className="mt-0.5 cursor-pointer "
                  />
                )}

                {open ? (
                  <div className="absolute top-10 right-[160px]">
                    <MenuAccount handleclose={handleCloseMenue} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <Link to={"/login"}>
                <p className="text-[18px] font-medium">Login</p>
              </Link>
            )}
            <div
              onClick={() => setopencart(true)}
              className="flex items-center gap-2 bg-green-800 hover:bg-green-900 cursor-pointer transition-all text-white rounded-[6px] py-2 px-3"
            >
              {user?._id ? (
                <>
                  <BsCart4 size={24} className="animate-bounce" />
                  {cart?.length > 0 ? (
                    <div className="flex flex-col">
                      <p className="font-semibold text-[14px]">
                        {quntity} items
                      </p>
                      <p className="font-semibold text-[14px]">
                        {convertpriceTocurrency(totalprice)}
                      </p>
                    </div>
                  ) : (
                    <p className="font-semibold text-[16px]">my cart</p>
                  )}
                </>
              ) : (
                <div className='flex items-center gap-2'>
                  <BsCart4 size={24} className="animate-bounce" />
                  <button>cart</button> 
                </div>
              )}
            </div>
          </div>

          {/* for mobile view */}
          <div className="lg:hidden block">
            <FaRegUserCircle
              onClick={() => {
                handleclick();
                setopenmobile(true);
              }}
              size={28}
              className="text-gray-500 cursor-pointer"
            />
          </div>
        </div>
      )}
      <div className="w-full block lg:hidden container pt-1 pb-2 px-1">
        <SearchInput />
      </div>
      {opencart && <DisplayViewcart close={() => setopencart(false)} />}
    </div>
  );
}

export default Header
