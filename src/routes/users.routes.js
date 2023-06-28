import { Router } from "express";
import { getUser, addUser,addListUsers,sync } from "../controllers/users.controller.js"

const router = new Router();
router.post("/code", getUser)

router.post("/", addUser)

router.post("/list" , addListUsers);

router.post("/sync", sync);



export default router