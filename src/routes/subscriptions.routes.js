import { Router } from "express";
import {  
         addSubscription,
         addListSubscriptions,
         getListSubscriptions
        } from "../controllers/subscriptions.contoller.js";

const router = new Router();

router.post("/" , addSubscription);

router.get("/list" , getListSubscriptions);

router.post("/list" , addListSubscriptions);
export default router