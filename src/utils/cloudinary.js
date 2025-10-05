import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API, 
        api_secret: process.env.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
    });
    

    //create a function to upload file
    const uploadCloudinary=async (localFilePath)=>{
        try {
            if(!localFilePath) return null
            //upload file on cloudinary
            const response=await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto"
            })
            //file uploaded successfully
            console.log("FILE HAS BEEN UPLOADED SUCCESSFULLY !", response.url);
            return response;
        } catch (error) {
            //remove the locally temporary stored files as uploading failed
            fs.unlinkSync(localFilePath);
            return null;
            
        }

    }
export {uploadCloudinary};