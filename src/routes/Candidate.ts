import { Router } from "express";
import { createCandidate } from "../controllers/candidate.controller";
import { getCandidates } from "../controllers/user.controller";
import { protectUser } from "../middleware/user.middleware";

const Candidate = Router();

Candidate.use(protectUser);
Candidate.post("/" ,createCandidate);
Candidate.get("/" , getCandidates);

export default Candidate;