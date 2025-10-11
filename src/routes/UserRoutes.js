import { Router } from "express";
import { loginUser, logOutUser, userRegister } from "../controllers/userRegisterController.js";
import {upload} from "../middlewares/MulterMiddleware.js";
import {verifyJWT} from "../middlewares/authMiddleware.js";


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
    userRegister
) //

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT,logOutUser) //here we inject middleware named "verifyJWT", just before logout meth

export default router;