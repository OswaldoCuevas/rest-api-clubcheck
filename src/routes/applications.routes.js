import { Router } from "express";
import { getApplications ,addApplication,getApplication, upload, updateApplication,getImg} from "../controllers/applications.controller.js";

const router = new Router();

router.get("/",  getApplications)

router.get("/:id",  getApplication )

router.get("/img/:name",  getImg )

router.post("/",upload.single('logo'), addApplication)

router.patch("/:id",upload.single('logo'), updateApplication)

export default router