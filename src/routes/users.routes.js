import { Router } from "express";
import { getUser, addUser,addListUsers,InComingSync,OutBoundSync } from "../controllers/users.controller.js"

const router = new Router();
router.post("/code", getUser)

router.post("/", addUser)

router.post("/list" , addListUsers);

router.post("/incoming_sync", InComingSync);

router.post("/outbound_sync", OutBoundSync);



export default router