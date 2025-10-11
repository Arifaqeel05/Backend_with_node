import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/Api_Error.js";
import {User} from '../models/userModel.js';
import {uploadCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Api_Response.js";
//-----------------token generation method-----
const generateAccessAndRefreshToken=async(userID)=>{
         try {
            //find user by ID which we receive in parameter
            const user=await User.findById(userID);


            //store reference of Access/refresh token that we have created in User model
            const accessToken=user.generateAccessToken();
            const refreshToken=user.generateRefreshToken();
            

            //store refreshToken in database
            user.refreshToken=refreshToken;
            await user.save({validateBeforeSave:false});
 
            //return the both token:
            return {refreshToken,accessToken}

         } catch (error) {
            throw new ApiError(501,"ERROR AT TOKEN GENERATION");
            
         }
      }
//------------REGISTER USER------------------------------

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
   
   const existedUser=await User.findOne
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

//---------------------------END HERE--------------------------


//---------------------------LOGIN-------------------------------
 
   const loginUser= asyncHandler(async(req, res)=>{

      //taking data 
      const {username, email, password}=req.body;

      //check what user have send from the frontend, if user didn't provide email or username, throw erro
      if(!username || !email){
         throw new ApiError(400, "Username or email is required");
      }

      //if user has send email or username, the find in database
      //User.findOne({username})      //finding the user on  the base of username/email.

      //if we check both in one step, then skip previous "findone " and do below step:
      const user=await User.findOne({
         $or:[
            {email},{username}
         ]
      })

      if(!user){
         throw new ApiError(404, "User not Exist");
      }

      //if we find the email/username of user, then now check password:
      const passwordValidate=await user.isPasswordCorrect(password);

      //throw error if password wrong
      if(!passwordValidate){
         throw new ApiError(401, "WRONG PASSWORD, TRY AGAIN");
      }

      //IF PASSWORD IS CORRECT, CREAT ACCESS/REFRESH TOKENS, we will create separate method onthe top , so we use it where we need

      const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);

      const loggedInUser=await User.findById(user._id).select(
         "-password -refreshToken"
      )

      //design cookies options(simple object)

      const options={
         httpOnly:true,
         secure:true
      }

      //now we have to return a response:
      return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshtoken",refreshToken,options).json(
         new Api_Response(
            200,{
               user:loggedInUser,accessToken,refreshToken


            },
            "USER LOGIN SUCESSFULLY !!!!"
         )
      )
      



   })
//----------------------------LOGIN END HERE-----------------------


//-----------------------------LOG OUT START----------------------
const logOutUser=asyncHandler(async(req,res)=>{
   //clear all cookies
   
})
//-----------------------------LOG OUT END------------------------

export {userRegister,loginUser,logOutUser};