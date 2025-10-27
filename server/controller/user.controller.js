import bcrypt from "bcrypt";
import User from "../model/User.model.js";
import send_Email from "../config/Verify_email.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import dotenv from "dotenv";
import GenetateAccessToken from "../utils/generatedAccessToken.js";
import GenerateRefreshToken from "../utils/genrateRefreshToken.js";
import uploadImageCloudinary from "../config/cloudinary.js";
import Generate_OTP from "../utils/generate_OTP.js";
import forgetpasswordTemplate from "../utils/forgetpasswordTempplate.js";
import jwt from 'jsonwebtoken'

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }
    const userExits = await User.findOne({ email: email });
    if (userExits) {
      return res
        .status(400)
        .json({ message: "User alredy exists", error: true, success: false });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const createuser = new User({
      email,
      password: hashedpassword,
      name,
    });
    if (!createuser) {
      return res
        .status(400)
        .json({ message: "sth went wrong", error: true, success: false });
    }
    const saveduser = await createuser.save();

    const verify_Url = `${process.env.FRONTED_URL_ONE}/Verify_email?code=${saveduser._id}`;
    const email_Sending = await send_Email({
      sendTo: email,
      subject: "Verify your email",
      html: verifyEmailTemplate({ name, url: verify_Url }),
    });
    return res.status(200).json({
      message: "user register successfully",
      error: false,
      success: true,
      data: saveduser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, error: true, success: false });
  }
};

export const verifyEmail = async (res, req) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res
        .status(404)
        .json({ message: "code is missing", success: false, error: true });
    }
    const finduser = await User.findOne({ _id: code });
    if (!finduser) {
      return res
        .status(404)
        .json({ message: "user not found", error: true, succsess: false });
    } else {
      const updateduser = await User.updateOne({
        _id: code 
    },
       { verify_email: true },
     );
      return res
        .status(200)
        .json({
          message: "updated successfully",
          error: false,
          success: true,
          data: updateduser,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true });
  }
};


export const login = async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(404).json({message:'all feilds are required',success:false , error:true})
        }
        const findUser = await User.findOne({email:email})
        if(!findUser){
            return res.status(404).json({message:'user not found',success:false , error:true})
        }
        if (findUser.status !== "Active") {
          return res.status(404).json({
            message: `your account is ${findUser.status} please contact admin`,
            success: false,
            error: true,
          });
        }
        const isMatchpassword = await bcrypt.compare(password,findUser.password)
        if(!isMatchpassword){
            return res.status(404).json({message:'invalid credentials',success:false , error:true})
        }
      
        const Accesstoken =await GenetateAccessToken(findUser._id)
        const refreshToken=await GenerateRefreshToken(findUser._id)
       const CookieOptions = {
        httpOnly:true,
        sameSite:'strict',
        secure:true
       }
        res.cookie("AccessToken", Accesstoken, CookieOptions);
        res.cookie('RefreshToken',refreshToken,CookieOptions)
          
        const updated =await User.findByIdAndUpdate(findUser?._id,{
          last_login_date:new Date()
        })
        return res.status(200).json({message:'login successfully',error:false,success:true,data:{Accesstoken,refreshToken,findUser}})

    } catch (error) {
        return res.status(500).json({message:error.message , success:false , error:true})
    }
}

export const Logout=async(req,res)=>{
  try {
    const userId = req.userId
     const CookieOptions = {
       httpOnly: true,
       sameSite: "strict",
       secure: true,
     };
    res.clearCookie("AccessToken", CookieOptions);
    res.clearCookie('RefreshToken',CookieOptions)

     const updated= await User.findByIdAndUpdate(userId , {refresh_token:""})
     return res.status(200).json({message:'logout successfully',success:true , error:false , data:updated})

  } catch (error) {
    return res.status(500).json({message:error.message , success:false , error:true})
  }
}


export const UploadImage=async(req,res)=>{
  try {
   const avatar = req.file
   const userId =req.userId
   if(!userId){
    return res.status(401).json({message:'unauthorized',success:false , error:true})
   }
   const upload = await uploadImageCloudinary(avatar)
   if(!upload){
    return res.status(400).json({message:'sth went wrong',success:false , error:true})
   }
  
   const uploaded = await User.findByIdAndUpdate(userId,{avatar:upload.url})

   return res.status(200).json({message:'image uploaded successfully',success:true , error:false , data:{avatar:upload.url} })
    
  } catch (error) {
    return res.status(500).json({message:error.message , success:false , error:true})
  }
}


export const  updateduserDetails = async(req,res)=>{
  try {
    const {email , password , name ,mobile} = req.body
    const userId = req.userId
  

    let hashedpassword = ""
    if(password){
      hashedpassword =await bcrypt.hash(password,10)
    }
  

    const payload = {}
    if (email) payload.email = email
    if (name) payload.name = name;
    if (mobile) payload.mobile = mobile;

   
    const updatedone= await User.findByIdAndUpdate(userId ,payload)

    return res.status(200).json({message:'Updated successfully' ,success:true , error:false , data:updatedone})
  } catch (error) {
    return res.status(500).json({message:error , success:false , error:true})
  }
}


export const forgetpassword = async(req,res)=>{
  try {
    const {email}=req.body
    if(!email){
      return res.status(404).json({message:'Please enter email' , success:false , error:true})
    }
    const finduser = await User.findOne(({email:email}))
    if(!finduser){
      return res.status(404).json({message:'user not found' , success:false , error:true})
    }
    const OTP = Generate_OTP()
    const expire_OTP = new Date(Date.now()+ 60*60*1000 ) // 1 hour from now
   console.log(OTP,'hi rola')
    const updated = await User.findByIdAndUpdate(finduser?._id, {
      forget_Password_OPT: OTP,
      forget_Password_OTP_expiry:expire_OTP,
    });

  send_Email({
    sendTo:email,
    subject :'forget password from bnkeyit',
    html:forgetpasswordTemplate({name:finduser?.name,otp:OTP})
  })
  return res.status(200).json({message:'Check your email' , success:true , error:false , data:updated})
  } catch (error) {
    return res.status(500).json({message:error , success:false ,error:true} )
  }
}


export const verifyforgetOTP = async(req,res)=>{
  try {
    const {email , otp}=req.body 
    if(!email || !otp){
      return res.status(404).json({message:'all fields are required' , success:false , error:true})
    }
    const user = await User.findOne({email:email})
    if(!user){
      return res.status(404).json({message:'user not found' , success:false , error:true})
    }

    const currenttime = new Date()
  if (new Date(user.forget_Password_OTP_expiry) < currenttime) {
    return res
      .status(400)
      .json({ message: "otp expired", success: false, error: true });
  }
    if (String(user.forget_Password_OPT) !== String(otp)) {
      return res
        .status(400)
        .json({ message: "invalid otp", success: false, error: true });
    }
     const updatedOTP = await User.findByIdAndUpdate(user?._id, {
       forget_Password_OPT: null,
       forget_Password_OTP_expiry:null,
     });
       return res.status(200).json({message:'otp verified successfully' , success:true , error:false})
  } catch (error) {
    return res.status(500).json({message:error.mssage || error , success:false ,error:true} )
  }
}


export const Resetpassword = async(req,res)=>{
  try {
    const {email ,newpassword ,confirmpassword}=req.body
    if(!email || !newpassword || !confirmpassword){
      return res.status(404).json({message:'all fields are required' , success:false , error:true})
    }
    const user = await User.findOne({email:email})
    if(!user){
      return res.status(404).json({message:'user not found' , success:false , error:true})
    }
    if(newpassword !== confirmpassword){
      return res.status(400).json({message:'newPassword and confirmPasword does not match' , success:false , error:true})
    }
    const hashingpassword = await bcrypt.hash(newpassword,10)
    const updated = await User.findByIdAndUpdate(user?._id , {password:hashingpassword , forget_Password_OPT:"" ,forget_Password_OTP_expiry:""})
    return res.status(200).json({message:'updated successfully' , success:true , error:false , data:updated})
  } catch (error) {
    return res.status(500).json({message:error.meessage || error , success:false ,error:true} )
  }
}

export const RefreshToken = async(req,res)=>{

  try {
    const refreshtoken = req?.cookies?.RefreshToken || req.headers?.authorization?.split(" ")[1]; // => [Bearer , refreshtoken]
    if(!refreshtoken){
      return res.status(401).json({message:'unauthorized' , success:false , error:true  })
    }

    const verifytoken = await jwt.verify(
      refreshtoken,
      process.env.SECRETACCESSTOKEN
    );

    console.log(verifytoken,'this is verify token')
    if(!verifytoken){
      return res.status(401).json({message:'invalid token' , success:false , error:true  })
    }


    const userId =verifytoken?._id
    const newaccesstoken = await GenetateAccessToken(userId)
    const cookeOptions = {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    }
    res.cookie("AccessToken",newaccesstoken,cookeOptions);
    return res.status(200).json({message:'new access token generated successfully' , success:true , error:false , data:newAccesstoken}) 
  
  } catch (error) {
    return res.status(500).json({message:error.message || error , success:false , error:true})  
  }
}


export const userDetails = async(req,res)=>{
  try {
    const userId = req.userId
    const findUser = await User.findById(userId).select(" -refresh_token -password");
    if(!findUser){
      return res.status(404).json({message:'the user not found'})
    }

    return res.status(200).json({meessage:'find User data success',data:findUser ,success:true,error:false})
    
  } catch (error) {
    return res.status(500).json({message:error.message || error ,success:false , error:true})
  }
}