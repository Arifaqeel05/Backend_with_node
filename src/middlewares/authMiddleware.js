import { ApiError } from "../utils/Api_Error";
import { asyncHandler } from "../utils/asyncHandler";

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    const token= req.cookies?.accessToken|| req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        throw new ApiError(401, "ERROR IN TOKEN IN MIDDLEWARE")
    }

})