import React, { useEffect, useRef, useState } from "react";
import { Endpoints } from "../common/Endpoint";
import axios from "axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link, useLocation } from "react-router-dom";

const OTP_Verification = () => {
  const [data, setdata] = useState(["", "", "", "", "", ""]);
  // convert data from array to object by using join method
  const otp = data.join("") 
  const inputRef = useRef([]);
  const navigate = useNavigate();
 const location =useLocation()
 console.log(location,'location')
 const email = location?.state?.email
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const forget_password_user = await axios.put(
        Endpoints.OTP_Verification.url,
        { otp, email},
        {
          withCredentials: true,
        }
      );
      if (forget_password_user) {
        console.log(forget_password_user);
        toast.success(forget_password_user?.data?.message);
        setdata(["", "", "", "", "", ""]);
        navigate("/Reset-password" , {state:{email}});
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(()=>{
    if(!location?.state?.email){
      navigate('/forget-password')  
    }
  },[])
  const checkOTP = data.every((el) => el);

  return (
    <div className="pt-[160px] lg:pt-[120px]">
      <div className="bg-white max-w-md px-4 mx-auto flex flex-col gap-3  py-5 ">
        <p className="text-[17px] font-bold">Enter OTP</p>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="text-[18px] ">Enter your OTP :</label>
            <div className="flex justify-between gap-1 sm:gap-4 py-2 mt-1">
              {data?.map((elememt, index) => (
                <input
                  ref={(ref) => {
                    inputRef.current[index] = ref;
                    return ref;
                  }}
                  value={data[index]}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newData = [...data];
                    newData[index] = value;
                    setdata(newData);

                    if (value && index < 5) {
                      inputRef.current[index + 1].focus();
                    }
                  }}
                  key={index}
                  name="otp"
                  maxLength={1}
                  id="otp"
                  type="text"
                  className="outline-none mt-1 text-center w-full  h-9 border px-2 text-[16px] focus-within:border-primary-200  border-gray-200 bg-blue-50 rounded-[4px]"
                />
              ))}
            </div>
          </div>
          <div
            className={`w-full  mx-auto flex justify-center items-center ${
              checkOTP ? `bg-green-800 hover:bg-green-900` : "bg-gray-500"
            }  py-2 rounded-[4px] mt-3 shadow-sm cursor-pointer`}
          >
            <button
              disabled={!checkOTP}
              type="submit"
              className="text-[16px] font-semibold text-white "
            >
              Verify OTP
            </button>
          </div>
        </form>
        <p className="text-[14px]">
          Already Have an Account ?
          <span className="text-[16px] text-green-700 hover:text-green-800 transition-all font-semibold">
            {" "}
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default OTP_Verification;
