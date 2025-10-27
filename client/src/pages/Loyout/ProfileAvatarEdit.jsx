import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Endpoints } from "../../common/Endpoint";
import toast from "react-hot-toast";
import { updatedImageAvatar } from "../../Redux/feature/userSlice";
import { IoClose } from "react-icons/io5";


const ProfileAvatarEdit = ({onclose}) => {
  const user = useSelector((state) => state?.user);
  const [loading, setloading] = useState(false);
 const dispatch =useDispatch()
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  const handleprovideprofile = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("avatar", file);
    try {
      setloading(true)
        const response = await axios.put(Endpoints.upload_Image.url, formdata, {
          withCredentials: true,
        });
        if(response) {
          console.log(response);
          dispatch(updatedImageAvatar(response?.data?.data?.avatar));
          toast.success(response?.data?.message)

        }
    } catch (error) {
      console.log(error)
    }finally{
      setloading(false)
    }
  };

  return (
    <div className="  h-full w-full inset-0 fixed flex items-center justify-center">
      <div className="bg-neutral-900 opacity-60  absolute inset-0 "></div>
        <div className="h-auto bg-white w-full  py-5 max-w-sm mx-auto rounded-sm relative">
          <div className="flex flex-col items-center ">
            <button
              className="flex justify-end w-full  absolute right-3"
              onClick={onclose}
            >
              <IoClose />
            </button>
            {user?.avatar ? (
              <img
                src={user?.avatar}
                className=" h-14 w-14 rounded-full border  border-gray-200 object-cover"
              />
            ) : (
              <FaRegUserCircle className=" " size={30} />
            )}
            <form onSubmit={handlesubmit} className="pt-3">
              <label htmlFor="uploadProfile" className="">
                <span className="text-[16px] cursor-pointer font-medium   border-2  border-primary-200 px-5 py-1.5 hover:bg-primary-200  transition-all rounded-[4px] ">
                  {loading ? "Loading..." : "  Upload"}
                </span>
              </label>
              <input
                onChange={handleprovideprofile}
                type="file"
                className="hidden"
                id="uploadProfile"
              />
            </form>
          </div>
        </div>
      </div>
  );
};

export default ProfileAvatarEdit;
