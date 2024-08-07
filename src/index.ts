
declare global {
    namespace Express {
        interface Request {
            user_id: string | " ",
        }
    }
}


import express from "express";
import dotenv from "dotenv";
import { errorMiddleware, notFound } from "./middleware/error.middleware";
import { login, register } from "./auth/user.auth";
import User from "./routes/User";
import Candidate from "./routes/Candidate";
import { connectDB } from "./db/db";
import CookieParser from "cookie-parser"

dotenv.config();
const port  = process.env.PORT;

connectDB().catch(()=>{
	 console.log("DB Connection Error");
	 process.exit(1);
});


const app = express();

app.use(express.json());
app.use(CookieParser());

app.post("/api/register" , register);
app.post("/api/login" , login);

app.use("/api/public" , User);
app.use("/api/candidate" , Candidate);


app.use(notFound);
app.use(errorMiddleware);

app.listen(process.env.PORT! , ()=>{
	 console.log(`Server is  listining at the port : ${port}`)
});


