import mongoose from "mongoose";
import bcrypt from "bcrypt"

export interface IUser extends mongoose.Document {
	 first_name : string;
	 last_name : string;
	 email : string;
	 password : string;
	 checkPassword: (password: string) => Promise<boolean>;
}


const userSchema = new mongoose.Schema<IUser>({

	first_name: {
		 type :String,
		 required:true
	},
	last_name : {
		 type : String,
		 required : true
	},
	email : {
		 type : String,
		 required  : true
	},
	password : {
		 type : String,
	     required  : true
	}


});

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
}


const User = mongoose.model("User" , userSchema);

export default User;