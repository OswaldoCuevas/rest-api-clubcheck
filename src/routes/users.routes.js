import { Router } from "express";
import { getUser, addUser,addListUsers,syncUP } from "../controllers/users.controller.js"

const router = new Router();
router.get("/", getUser)

router.post("/", addUser)

router.post("/list" , addListUsers);

router.post("/sync_up", syncUP);



export default router