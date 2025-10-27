
import {Navigate, Outlet} from 'react-router-dom'


export const ProtectedRoute = ()=>{
   const token = localStorage.getItem("accesstoken");   
   return token ? <Outlet/> : <Navigate to={"/login"}/>
}
