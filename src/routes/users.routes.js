import { Router } from "express";
import { getUser, addUser,sync,addToken } from "../controllers/users.controller.js"
import { ensuresToken } from "../ensure_token.js";
const router = new Router();
router.post("/code", getUser)

router.post("/token",addToken)

router.post("/",ensuresToken,addUser)

router.post("/sync", sync);



export default router