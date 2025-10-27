import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import ProfileAvatarEdit from "./ProfileAvatarEdit";
import axios from "axios";
import { Endpoints } from "../../common/Endpoint";
import toast from "react-hot-toast";
import { fetchuserDetails } from "../../utils/fetchuserDetails";
import { SetuserDetails } from "../../Redux/feature/userSlice";

const Profile = () => {
  const user = useSelector((state) => state?.user);
  const[OpenProfileAvatarEdit ,setOpenProfileAvatarEdit]=useState(false)
  const[loading,setloading]=useState(false)
  const dispatch = useDispatch()

  const[formdata,setformdata]=useState({
    name:"",
    email:"",
    mobile:""
  })
  const handlechange=(e)=>{
    const{name,value}=e.target
    setformdata((prev)=>({
        ...prev,
        [name] : value
    }))

  }


  const handleSubmit = async(e)=>{
     try {
      setloading(true)
      e.preventDefault()
      const response = await axios.put(Endpoints.update_userDetails.url,formdata,{withCredentials:true})
      if(response){
        toast.success(response?.data?.message)
       const userdetails= await fetchuserDetails()
       console.log(userdetails,'rola')
        dispatch(SetuserDetails(userdetails?.data));
      }
     } catch (error) {
      console.log(error)
     }finally{
      setloading(false);
     }
  }

  useEffect(()=>{
    setformdata({
   name : formdata.name || user?.name,
   email: formdata.email || user?.email , 
   mobile: formdata.mobile || user?.mobile,
    })
  
  },[user])

  return (
    <div className="p-6">
      {/* for avatar  */}
      <div className="flex flex-col items-start">
        {user?.avatar ? (
          <img
            src={user?.avatar}
            className="mx-2 h-12 w-12 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <FaRegUserCircle className=" mx-2 bg-red-500 rounded-full p-1" size={50} />
        )}
        <div className="pt-2">
          <button
            onClick={() => setOpenProfileAvatarEdit(true)}
            className="text-[16px]  text-neutral-700 border  border-primary-200 px-5 py-0.5 hover:bg-primary-200 hover:text-white transition-all rounded-full "
          >
            Edit
          </button>
        </div>
        {OpenProfileAvatarEdit && (
          <ProfileAvatarEdit onclose={() => setOpenProfileAvatarEdit(false)} />
        )}
      </div>

      {/* for name password email mobiel  */}

      <form className="py-4 flex flex-col gap-3  " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-[16px]">
            Name
          </label>
          <input
            placeholder="Enter your name"
            value={formdata.name}
            id="name"
            name="name"
            type="text"
            onChange={handlechange}
            required
            className="outline-none text-[16px] bg-blue-50 border border-gray-300 focus:border-primary-200 h-9  rounded-[6px]  px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[16px]">
            Email
          </label>
          <input
            placeholder="Enter your email"
            value={formdata.email}
            id="email"
            name="email"
            type="email"
            required
            onChange={handlechange}
            className="outline-none text-[16px] bg-blue-50 border border-gray-300 focus:border-primary-200 h-9  rounded-[6px]  px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mobile" className="text-[16px]">
            Mobile
          </label>
          <input
            placeholder="Enter your mobile"
            value={formdata.mobile}
            id="mobile"
            required
            name="mobile"
            type="text"
            onChange={handlechange}
            className="outline-none text-[16px] bg-blue-50 border border-gray-300 focus:border-primary-200 h-9  rounded-[6px]  px-2 py-1"
          />
        </div>
        <div className="flex  items-center justify-center mt-2 ">
          <button
            type="submit"
            className="text-[16px] hover:bg-primary-200 hover:text-black transition-all border rounded-[6px] border-primary-200 w-full py-1.5 text-primary-200 font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
