import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express-serve-static-core";
import { ILogin, IRegister } from "../dto/user.dto";
import User from "../models/user.model";
import { generateJwt } from "../utils/generate_jwt.util";

export const register = expressAsyncHandler(async (req:Request<{} , {} , IRegister> , res:Response)=>{ 
       
       const {first_name,last_name,email,password} = req.body;
        
       const pre_user = await User.findOne({email:email});

       if(pre_user){
            res.status(400);
            throw new Error("User Already Exists");
       }

       const new_user =  await User.create({
           first_name : first_name,
           last_name : last_name,
           email : email,
           password  : password
       });

       if(!new_user){
           res.status(400);
           throw new Error("Unable to create the User");
       }

      res.status(200).json({
           data : {
                email: new_user.email,
                status: 200
           }
       });
        
       return; 
});


export const login = expressAsyncHandler(async(req:Request<{} , {} , ILogin> , res:Response)=>{
      const {email,password} = req.body;
      
      if(!email && !password) {
          res.status(400) 
          throw new Error("Must Specify the Email and Password for user login");
      }
       
      const user =  await User.findOne({email : email});

      if(!user){ 
        res.status(400);
        throw new Error("Invalid User email");
      }

      if(!await user.checkPassword(password)){
           res.status(400);
           throw new Error("Invalid Password");
      }
     
     generateJwt(res , user);
     res.status(200);
     res.json({
        data:{
             email : user.email,
             state  : "login successful"
        }
     });
     return;
});