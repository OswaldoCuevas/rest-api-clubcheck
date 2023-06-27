import { Router } from "express";
import { getCustomer,addCustomer,editCustomer } from "../controllers/customers.controller.js";
const router = new Router();

router.get("/:id",  getCustomer)//obtener customer

router.post("/",  addCustomer)//resgistar customer

router.patch("/:id", editCustomer)
export default router