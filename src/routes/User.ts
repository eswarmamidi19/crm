 import { Router } from "express";
import { protectUser } from "../middleware/user.middleware";
import { getCandidates, showProfile } from "../controllers/user.controller";

const User = Router();

User.use(protectUser);

User.post("/profile" , showProfile);
User.get("/candidate" , getCandidates );

export default User;