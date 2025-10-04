import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//Schema--> a special class provided by Mongoose to define how records will look inside a MongoDB collection.


//// Create a new schema for the 'User' collection
const userSchema=new Schema(
    {
        //// Define the 'username' field
            username:
        {
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            unique:true,
            index:true
        },
            //// Define the 'email' field
            email:
            {
                type:String,
                required:true,
                lowercase:true,
                trim:true,
                unique:true
            },

            fullName:
            {
                type:Strin,
                trim:true,
                index:true,
                required:true
            },
            avatar:{
                type:String,
                required:true
            },
            coverImage:{
                type:String
            },

            watchHistory:[
                {
                type:Schema.Types.ObjectId,
                ref:"Video"
                }
            ],

            password:{
                type:String,
                required: [true,"Password is Required"]
            },

            refresToken:{
                type:String
            }
    },

    {
        timestamps:true
    },
)

//------------ENCRYPTION OF PASSWORD-----------------
// Before saving a user document to the database, run this middleware function


userSchema.pre("save", async function(next){

    // We check if the 'password' field has been modified (new or updated)
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
        next()
    }else{
          // If the password was not modified, skip hashing and continue saving

        return next();
    }
})
//--------------------------------------

/*
his line adds a custom method to your Mongoose schema for verifying (comparing) passwords, 
which is essential for user login authentication.
 */
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expireIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,


        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




//// Create a 'User' model based on the schema

export const User=mongoose.model("User",userSchema);