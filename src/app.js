import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express();

//always in all project:
app.use(express.json({limit:'16kb'})); //accepting json
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public")); //static files
app.use(cookieParser());
//cors
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true,
        allowedHeaders:['Content-Type', 'Authorization']
    }
))



export {app};