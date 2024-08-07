import { Request,Response } from "express-serve-static-core";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model";
import Candidate from "../models/candidate.model";

export const showProfile = expressAsyncHandler(async(req:Request,res:Response)=>{
    const user_id = req.user_id;
    const user = await User.findById(user_id);
    if(!user){
       res.status(400);
       throw new Error("unable to fetch the user");
    } 
    res.status(200);
    res.json({
       data: user
    });
});

export const getCandidates = expressAsyncHandler(async(req:Request , res : Response)=>{
  
      const user_id = req.user_id;
      const candidates =  await Candidate.find({user_id:user_id});
      if(!candidates){
      	  res.status(400);
         throw new Error("unable to fetch the candidates");
      }
      res.status(200);
      res.json({
      	 data :  candidates
      });
});