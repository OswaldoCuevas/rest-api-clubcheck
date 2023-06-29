import { Router } from "express";
import { getCustomer,addCustomer,editCustomer,sync } from "../controllers/customers.controller.js";
import { ensuresToken } from "../ensure_token.js";
const router = new Router();

router.get("/", ensuresToken, getCustomer)//obtener customer

router.post("/",  addCustomer)//resgistar customer

router.patch("/",ensuresToken, editCustomer)

router.post("/sync", ensuresToken, sync);
export default router