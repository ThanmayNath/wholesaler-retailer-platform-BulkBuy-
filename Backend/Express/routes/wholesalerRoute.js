import { Router } from "express";
const router = Router();
import verifyJWT from "../Token/jwt.js";
import wholesalerAuth from "../controllers/wholesalerAuth.js";
import wholesalerOps from "../controllers/wholesalerOps.js";

router.post("/reg", wholesalerAuth.wholesalerReg);
router.post("/login", wholesalerAuth.wholesalerLogin);
router.put("/updateprofile", verifyJWT, wholesalerOps.updateProfile);

export default router;
