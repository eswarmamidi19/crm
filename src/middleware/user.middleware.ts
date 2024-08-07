import expressAsyncHandler from "express-async-handler";
import { Request,Response,NextFunction } from "express-serve-static-core";
import jwt from "jsonwebtoken";
export const protectUser = expressAsyncHandler((req:Request , res:Response , next : NextFunction)=>{
  let token;
  token = req.cookies.user_auth_jwt;
   if (!token) {
    res.status(400);
    throw new Error("Cookie Does not Exist");
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;
    req.user_id = decoded.user_id as string;
    next();
    return;
  } catch (error) {
    res.status(400);
    throw new Error("Invalid token");
  }
});