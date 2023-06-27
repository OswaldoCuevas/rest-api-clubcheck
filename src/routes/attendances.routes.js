import { Router } from "express";
import { getAttendance,addAttendance,editAttendance } from "../controllers/attendances.controller.js";
const router = new Router();

router.get("/:id",  getAttendance)//obtener customer

router.post("/",  addAttendance)//resgistar customer

router.patch("/:id", editAttendance)



export default router