import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/Api_Error.js";
import {User} from '../models/userModel.js';
import {uploadCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Api_Response.js";


const userRegister= asyncHandler(async (req,res)=>{

   //method:01 destructuring approch

   const {username, fullName, email,password}=req.body;

   //validating the information:
   if([username, fullName, email, password].some((field)=>field?.trim()==="")){
      throw new ApiError(400 ,"All fields are required",)
   }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) 
      {
         throw new ApiError(400, "Invalid email format");
      }
  

   //other way:not recommended
   /*
   const username=req.body.username;
   const fullName=req.body.fullName;
   const email=req.body.email;
   const avatar=req.body.avatar;
   const password=req.body.password */
   
   const existedUser=User.findOne
   (
      {
         $or:[{username},{email}]
      }
   );

   if(existedUser)
      {
         throw new ApiError(409, "User already Existed!!!")
      }
   
   const avatarLocalPath=req.files?.avatar[0]?.path;
   const coverImageLocal =req.files?.coverImage[0]?.path 

   if(!avatarLocalPath){
      throw new ApiError(400,"Avatar is required!")
   }

   const avatar=await uploadCloudinary(avatarLocalPath);
   const coverImage=await uploadCloudinary(coverImageLocal);

   if(!avatar){
      throw new ApiError(400,"Avatar is required!")

   }

   const user=await User.create({
      fullName,
      avatar:avatar.url,
      coverImage:coverImage?.url||"",
      email,
      password,
      username:username.toLowerCase()


   })
   const newlyCreatedUser=await User.findById(user._id).select(
      "-password -refreshToken"
   );

   if(!newlyCreatedUser){
      throw new ApiError(500,"something went wrong while registering user");
   }

   return res.status(201).json(
      new ApiResponse(201,newlyCreatedUser,"Successfully registerd")
   );

});

export {userRegister};