import { Router } from "express";
const router = Router();
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import verifyJWT from "../Token/jwt.js";
import retailerAuth from "../controllers/retailerAuth.js";
import retailerOps from "../controllers/retailerOps.js";

router.post("/reg", retailerAuth.retailerReg);
router.post("/login", retailerAuth.retailerLogin);
router.put("/updateprofile", verifyJWT, retailerOps.updateProfile);

export default router;
