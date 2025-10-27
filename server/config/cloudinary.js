import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY    
})


const uploadImageCloudinary = async (Image) => {
  try {
    const buffer = Image.buffer
    
   return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "binkyit" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer); // لازم تمرر البفر هون
    });


  } catch (error) {
    console.log("Upload error:", error);
    throw error;
  }
};


export default  uploadImageCloudinary
