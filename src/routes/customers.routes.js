import { Router } from "express";
import { getCustomer,addCustomer,editCustomer } from "../controllers/customers.controller.js";
const router = new Router();

router.get("/",  getCustomer)//obtener customer

router.post("/",  addCustomer)//resgistar customer

router.patch("/", editCustomer)
export default router