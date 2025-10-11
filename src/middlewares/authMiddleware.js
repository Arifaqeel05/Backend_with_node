import { User } from "../models/userModel.js";
import { ApiError } from "../utils/Api_Error.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  jwt  from 'jsonwebtoken';

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token= req.cookies?.accessToken|| req.header("Authorization")?.replace("Bearer ", "");
    
        if(!token){
            throw new ApiError(401, "ERROR IN TOKEN IN MIDDLEWARE")
        }
    
    
        const decodedInfo=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user=await User.findById(decodedInfo?._id).select("-password -refreshToken");
        if(!user){
            throw new ApiError(401,"USER NOT FOUND")
        }
    
        //INJECT NEW OBJECT INTO REQ
        req.user=user;
        next()
    } catch (error) {
        throw new ApiError(401, "invalid access account")
    }
})