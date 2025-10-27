import React, { useEffect } from 'react'
import MenuAccountmobile from '../components/MenuAccountmobile';
import { IoClose } from "react-icons/io5";
import UseMobile from '../Hooks/UseMobile';

const UserMenueMobile = () => {
      const [Ismobile] = UseMobile();

    const handleclose = ()=>{
      window.history.back()
    }

 useEffect(() => {
   if (!Ismobile) {
     window.history.back("/");
   }
 }, [Ismobile]);
  return (
    <section className=" pb-6 w-full bg-white p-4 ">
        <button onClick={()=>handleclose()} className='w-fit ml-auto flex justify-end items-center group hover:bg-red-500 hover:rounded-full p-0.5 transition-all'>
            <IoClose size={23} className='text-neutral-900 group-hover:text-white transition-all'/>
        </button>
      <div className='w-full bg-white'>
        <MenuAccountmobile />
      </div>
    </section>
  );
}

export default UserMenueMobile
