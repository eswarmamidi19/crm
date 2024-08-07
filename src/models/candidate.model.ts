

import mongoose from "mongoose";

interface ICandidate{
	 first_name : string;
	 last_name  : string;
	 email : string;
	 user_id : mongoose.Types.ObjectId;
}

const candidateSchema = new mongoose.Schema<ICandidate>({
    first_name : {
    	 type : String,
    	 required  : true
    },
    last_name : {
    	 type  :String,
    	 required:true
    },
    email : {
    	 type : String,
    	 required:true
     },
     user_id : {
     	 type : mongoose.SchemaTypes.ObjectId,
     	 ref : "User",
     	 required  : true 
     }

});


const Candidate = mongoose.model<ICandidate>("Candidate", candidateSchema);

export default Candidate;