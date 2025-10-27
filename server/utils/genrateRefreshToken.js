
import jwt from 'jsonwebtoken'
import User from '../model/User.model.js';
const GenerateRefreshToken = async(userId)=>{
  try {
    const token = jwt.sign({ _id: userId }, process.env.SECRETACCESSTOKEN,{expiresIn:'7d'});
    const updateRefreshToken = await User.updateOne(
      { _id: userId },
      { refresh_token :token}
    );

     return token;
  } catch (error) {
    console.log(error,'error from refreshToken')
  }
}

export default GenerateRefreshToken