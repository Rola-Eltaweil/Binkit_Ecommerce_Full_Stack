import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import { MdManageAccounts } from "react-icons/md";
import axios from 'axios';
import { Endpoints } from '../common/Endpoint';
import toast from 'react-hot-toast';
import {logout} from '../Redux/feature/userSlice'
import { FaExternalLinkAlt } from "react-icons/fa";
import { setcartItems } from '../Redux/feature/cart';

const MenuAccount = ({ handleclose }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      const loggout = await axios.post(
        Endpoints.logout.url,
        {},
        {
          withCredentials: true,
        }
      );
      if (loggout) {
        handleclose();
        dispatch(logout());
        localStorage.clear();
        setcartItems([])
        navigate("/");
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const close = ()=>{
    if(handleclose){
      handleclose()
    }
  }
  return (
    <div className="bg-white shadow-md w-[200px] h-auto z-50 border border-gray-200 rounded-sm p-3 ">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-[15px] text-green-800 flex gap-1 items-center ">
          <MdManageAccounts size={22} />
          My Account
        </h2>
        <p className="capitalize text-[17px] text-gray-600 flex gap-2 items-center ">
          {user?.role[0] == "ADMIN" ? (
            <p className=" text-[16px] font-">
              {" "}
              {user?.name}{" "}
              <span className="text-red-600 text-[15px]">(Admin)</span>
            </p>
          ) : (
            user?.name
          )}
          <h8>
            <Link to={"/dashboard-profile"}>
              <FaExternalLinkAlt
                onClick={close}
                size={14}
                className="hover:text-primary-100  cursor-pointer transition-all"
              />
            </Link>
          </h8>
        </p>
        <Divider />
        <div className=" pt-1 flex flex-col gap-1 ">
          {user?.role == "ADMIN" ? (
            <div className="flex flex-col gap-1">
              <Link to={"/dashboard-profile/category"}>
                <p
                  onClick={close}
                  className="text-[14px] p-0.5 px-1 hover:bg-orange-200 "
                >
                  Category
                </p>
              </Link>
              <Link to={"/dashboard-profile/subcategory"}>
                <p
                  onClick={close}
                  className="text-[14px] p-0.5 px-1 hover:bg-orange-200 "
                >
                  SubCategory
                </p>
              </Link>
              <Link to={"/dashboard-profile/upload_product"}>
                <p
                  onClick={close}
                  className="text-[14px] p-0.5 px-1 hover:bg-orange-200 "
                >
                  Upload Product
                </p>
              </Link>
              <Link to={"/dashboard-profile/products"}>
                <p
                  onClick={close}
                  className="text-[14px] p-0.5 px-1 hover:bg-orange-200 "
                >
                  Product
                </p>
              </Link>
            </div>
          ) : (
            <></>
          )}
          <Link to={"/dashboard-profile/orders"}>
            <p
              className="text-[14px] p-0.5 px-1 hover:bg-orange-200 "
              onClick={close}
            >
              My Orders
            </p>
          </Link>

          <Link to={"/dashboard-profile/Address"}>
            <p
              onClick={close}
              className="text-[14px] hover:bg-orange-200 p-0.5 px-1"
            >
              Save Address
            </p>
          </Link>

          <p
            className="text-[14px] cursor-pointer hover:bg-orange-200 p-0.5 px-1"
            onClick={() => Logout()}
          >
            Log Out
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuAccount
