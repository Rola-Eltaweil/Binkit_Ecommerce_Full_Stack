import express from 'express'
import { forgetpassword, login, Logout, RefreshToken, registerUser, Resetpassword, updateduserDetails, UploadImage, userDetails, verifyEmail, verifyforgetOTP } from '../controller/user.controller.js'
import authUser from '../middleware/auth.js'
import upload from '../middleware/multer.js'


const router = express.Router()


router.post('/register_User',registerUser)
router.post('/Verify_email',verifyEmail)
router.post('/login',login)
router.post('/logout',authUser,Logout)
router.put('/upload_Image',authUser,upload.single('avatar'),UploadImage)
router.put('/user_details',authUser,updateduserDetails)
router.put('/forget-password',forgetpassword)
router.put('/verify-forgetpassword',verifyforgetOTP)
router.put("/rest-password", Resetpassword);
router.post('/Resfresh-token',RefreshToken)
router.get("/userDetails", authUser,userDetails);
export default router