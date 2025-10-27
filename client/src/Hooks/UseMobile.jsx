import { useEffect, useState } from "react";

const UseMobile = (breakpoint = 768)=>{
   const [Ismobile,setIsmobile]=useState(window.innerWidth < breakpoint)


   const handleResize = ()=>{
    const check = window.innerWidth < breakpoint
    setIsmobile(check)
}

useEffect(()=>{
    handleResize()
    window.addEventListener('resize',handleResize)

    return()=> window.removeEventListener('resize',handleResize)
},[])

return [Ismobile]
}

export default UseMobile;