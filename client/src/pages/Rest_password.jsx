import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import axios from "axios";
import { Endpoints } from "../common/Endpoint";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import toast from "react-hot-toast";

const Rest_password = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showpasswordOne, setShowpasswordOne] = useState(false);
  const [showpasswordTwo, setShowpasswordTwo] = useState(false);
  const [formdata, setformdata] = useState({
    email: "",
    newpassword: "",
    confirmpassword: "",
  });

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/");
    } else {
      setformdata((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  console.log("data", formdata);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Reset_pass = await axios.put(
        Endpoints.Reset_password.url,
        formdata,
        {
          withCredentials: true,
        }
      );
      if (Reset_pass) {
        console.log(Reset_pass);
        toast.success(Reset_pass?.data?.message);
        setformdata({
          email: "",
          newpassword: "",
          confirmpassword:""
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkform = formdata.newpassword && formdata.confirmpassword;

  return (
    <div className="pt-[160px] lg:pt-[120px]">
      <div className="bg-white max-w-md px-4 mx-auto flex flex-col gap-3  py-5 ">
        <form onSubmit={handleSubmit}>
          <p className="text-[17px] font-bold mb-3">Enter Your Password</p>
          <div className="relative mb-2">
            <label className="text-[16px] ">New Password :</label>
            <input
              name="newpassword"
              onChange={handleOnchange}
              value={formdata.newpassword}
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
          <div className="">
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
              checkform ? `bg-green-800 hover:bg-green-900` : "bg-gray-500"
            }  py-2 rounded-[4px] mt-3 shadow-sm cursor-pointer`}
          >
            <button
              disabled={!checkform}
              type="submit"
              className="text-[18px] font-semibold text-white "
            >
              Change Password
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

export default Rest_password;
