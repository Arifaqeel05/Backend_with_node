import { Router } from "express";
import { userRegister } from "../controllers/userRegisterController.js";
import {upload} from "../middlewares/MulterMiddleware.js";


const router=Router();

router.route("/register").post(
    upload.fields([
        //as we are accepting two files,(avatar, coverimage), so we create 2 object
        {
            name:"avatar",
            maxCount:1

        },
        {
            name:"coverImage",
            maxCount:1

        }
    ]),
    userRegister) //

export default router;