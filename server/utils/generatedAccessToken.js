import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

const GenetateAccessToken = async(userId)=>{
 try {
      const token =  jwt.sign(
        { _id: userId },
        process.env.SECRETACCESSTOKEN,
        { expiresIn: "1d" }
      );
      return token;
 } catch (error) {
    console.log(error,'error from accessToken')
 }
}


export default  GenetateAccessToken