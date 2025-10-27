import React, {  useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { Endpoints } from "../common/Endpoint";
import axios from "axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetuserDetails } from "../Redux/feature/userSlice";
import { fetchuserDetails } from "../utils/fetchuserDetails";
const Login = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [showpasswordOne, setShowpasswordOne] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login_user = await axios.post(Endpoints.login.url, formdata, {
        withCredentials: true,
      });
      if (login_user) {
        console.log(login_user)
        toast.success(login_user?.data?.message);
          localStorage.setItem(
             "accesstoken",
             login_user?.data?.data?.Accesstoken
           );
            localStorage.setItem(
             "refreshtoken",
             login_user?.data?.data?.refreshToken
           );
        setformdata({
          email: "",
          password: "",
        });
        
        navigate("/");
        const GetuserData = await fetchuserDetails()
        dispatch(SetuserDetails(GetuserData?.data))
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

  const checkform =
    formdata.email &&
    formdata.password

  return (
    <div className="pt-[20px] lg:pt-[120px]">
      <div className="bg-white max-w-md px-4 mx-auto flex flex-col gap-3  py-5 ">
        <form onSubmit={handleSubmit}>
          <p className="text-[18px] font-semibold">
            Welcome to Binkeyit <span className="wave text-[24px]">👋</span>
          </p>

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
          <Link to={"/forget-password"}>
            <p className="text-[16px] flex justify-end hover:text-primary-200 transition-all">
              Forget Password ?
            </p>
          </Link>
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
              Login
            </button>
          </div>
        </form>
        <p className="text-[14px]">
          Don't Have an Account ?
          <span className="text-[16px] text-green-700 hover:text-green-800 transition-all font-semibold">
            {" "}
            <Link to={"/register"}>Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
