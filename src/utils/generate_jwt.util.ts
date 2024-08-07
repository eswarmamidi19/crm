import { Response} from "express-serve-static-core";
import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
export function generateJwt(res :Response , user:IUser){
   
   const token = jwt.sign({user_id : user._id} , process.env.JWT_SECRET! , {
   	 expiresIn : "2d"
   });

    res.cookie("user_auth_jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
}