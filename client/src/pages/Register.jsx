import React, { useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { Endpoints } from "../common/Endpoint";
import axios from 'axios'
import toast from 'react-hot-toast'
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate , Link } from "react-router-dom";
const Register = () => {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const[showpasswordOne,setShowpasswordOne]=useState(false)
  const[showpasswordTwo,setShowpasswordTwo]=useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formdata.password !== formdata.confirmpassword){
        toast.error("password and confirm password not match");
      }
     const registeruser = await axios.post(Endpoints.register.url,formdata,{withCredentials:true})
     if(registeruser){
      toast.success(registeruser?.data?.message)
      setformdata({
        name:"",
        email:"",
        password:"",
        confirmpassword:""
      })
      navigate('/login');
     }
    } catch (error) {
      AxiosToastError(error)
    }
  };

  const handleOnchange = (e)=>{
  const {name,value} = e.target
   setformdata((prev)=>({
   ...prev,
   [name]:value
   }))
  }


  const checkform = formdata.name && formdata.email && formdata.password && formdata.confirmpassword

  return (
    <div className="pt-[160px] lg:pt-[120px]">
      <div className="bg-white max-w-md  mx-auto flex flex-col gap-3  py-5 px-4">
        <form onSubmit={handleSubmit}>
          <p className="text-[18px] font-semibold">
            Welcome to Binkeyit <span className="wave text-[24px]">👋</span>
          </p>
          <div>
            <label className="text-[18px] ">Name :</label>
            <input
              name="name"
              onChange={handleOnchange}
              value={formdata.name}
              type="text"
              placeholder="Enter your name"
              className="outline-none mt-1 w-full h-9 border px-2 text-[16px] focus-within:border-primary-200  border-gray-200 bg-blue-50 rounded-[4px]"
            />
          </div>
          <div>
            <label className="text-[18px] ">Email :</label>
            <input
              name="email"
              onChange={handleOnchange}
              value={formdata.email}
              type="email"
              placeholder="Enter your email"
              className="outline-none mt-1 w-full h-9 border px-2 text-[16px] focus-within:border-primary-200  border-gray-200 bg-blue-50 rounded-[4px]"
            />
          </div>
          <div className="relative">
            <label className="text-[18px] ">Password :</label>
            <input
              name="password"
              onChange={handleOnchange}
              value={formdata.password}
              type={showpasswordOne ? "text" : "password"}
              placeholder="Enter your password"
              className="outline-none  mt-1 w-full h-9 border px-2 text-[16px] focus-within:border-primary-200  border-gray-200 bg-blue-50 rounded-[4px]"
            />

            {showpasswordOne ? (
              <LuEye
                className="cursor-pointer absolute top-[47px] right-2"
                onClick={() => setShowpasswordOne((prev) => !prev)}
              />
            ) : (
              <LuEyeClosed
                className="cursor-pointer absolute top-[47px] right-2 "
                onClick={() => setShowpasswordOne((prev) => !prev)}
              />
            )}
          </div>
          <div>
            <label className="text-[16px] ">Confirm Password :</label>
            <input
              name="confirmpassword"
              onChange={handleOnchange}
              value={formdata.confirmpassword}
              type={showpasswordTwo ? "text" : "password"}
              placeholder="Enter your confirm password"
              className="outline-none mt-1 w-full h-9 border px-2 text-[16px] focus-within:border-primary-200  border-gray-200 bg-blue-50 rounded-[4px]"
            />
            <div className="relative">
              {showpasswordTwo ? (
                <LuEye
                  className="cursor-pointer absolute bottom-[12px] right-2"
                  onClick={() => setShowpasswordTwo((prev) => !prev)}
                />
              ) : (
                <LuEyeClosed
                  className="cursor-pointer absolute bottom-[12px] right-2"
                  onClick={() => setShowpasswordTwo((prev) => !prev)}
                />
              )}
            </div>
          </div>
          <div
            className={`w-full mx-auto flex justify-center items-center ${
              checkform ? `bg-green-800` : "bg-gray-500"
            }  py-2 rounded-[4px] mt-3 shadow-sm cursor-pointer`}
          >
            <button
              disabled={!checkform}
              type="submit"
              className="text-[18px] font-semibold text-white "
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-[14px]">
          Already Have an Account ?
          <span className="text-[16px] text-green-700 hover:text-green-800 transition-all font-semibold">
            { " "}
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
