import React, { useState } from "react";
import { Endpoints } from "../common/Endpoint";
import axios from "axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link } from "react-router-dom";

const Forget_password = () => {
  const [formdata, setformdata] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const forget_password_user = await axios.put(
        Endpoints.forget_password.url,
        formdata,
        {
          withCredentials: true,
        }
      );
      if (forget_password_user) {
        console.log(forget_password_user);
        toast.success(forget_password_user?.data?.message);
        setformdata({
          email: "",
        });
        navigate("/OTP_Verification" , {state:formdata});
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

  const checkform = formdata.email 

  return (
    <div className="pt-[160px] lg:pt-[120px]">
      <div className="bg-white max-w-md px-4 mx-auto flex flex-col gap-3  py-5 ">
        <p className="text-[17px] font-semibold">Forget password</p>
        <form onSubmit={handleSubmit}>
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
              Send OTP
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

export default Forget_password;
