import { Router } from "express";
import { getCustomer,addCustomer,editCustomer,sync,getImg,upload,updateLogo } from "../controllers/customers.controller.js";
import { ensuresToken } from "../ensure_token.js";
const router = new Router();

router.get("/", ensuresToken, getCustomer)//obtener customer

router.get("/img/:name",  getImg )

router.post("/",  addCustomer)//resgistar customer

router.post("/add_logo",ensuresToken,upload.single('logo'),updateLogo)

router.put("/",ensuresToken, editCustomer)

router.post("/sync", ensuresToken, sync);
export default router