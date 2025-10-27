import axios from "axios"
import { Endpoints } from "../common/Endpoint"

export const fetchuserDetails = async()=>{
    try {
        const userDetails =await axios.get(Endpoints.userDetails.url,{
            withCredentials:true
        })
        if(userDetails){
            return userDetails.data
        }
    } catch (error) {
        console.log(error)
    }
} 