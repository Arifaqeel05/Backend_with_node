import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/Api_Error.js"
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
   
});

export {userRegister};