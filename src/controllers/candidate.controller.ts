import expressAsyncHandler from "express-async-handler";
import {Request ,Response} from "express-serve-static-core";
import Candidate from "../models/candidate.model";

export const createCandidate = expressAsyncHandler(async(req:Request , res : Response)=>{
  
      const user_id = req.user_id;
      const {first_name , last_name , email} = req.body;
      const candidates =  await Candidate.create({
         first_name , last_name, email , user_id:user_id 
      });
      if(!candidates){
           res.status(400);
         throw new Error("unable to create the candidate");
      }
      res.status(200);
      res.json({
          data :  candidates
      });
});