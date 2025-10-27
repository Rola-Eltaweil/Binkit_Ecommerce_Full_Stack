import { useEffect, useState } from "react";

const UseMobileuser = (breakpoint = 1020)=>{
   const [IsmobileUser,setIsmobileUser]=useState(window.innerWidth < breakpoint)


   const handleResize = ()=>{
    const check = window.innerWidth < breakpoint
    setIsmobileUser(check);
}

useEffect(()=>{
    handleResize()
    window.addEventListener('resize',handleResize)

    return()=> window.removeEventListener('resize',handleResize)
},[])

return [IsmobileUser];
}

export default UseMobileuser;