import { Router } from "express";
import {  
         addSubscription,
         addListSubscriptions,
         getListSubscriptions
        } from "../controllers/subscriptions.contoller.js";

const router = new Router();

router.post("/" , addSubscription);

router.post("/list/get" , getListSubscriptions);

router.post("/list/add" , addListSubscriptions);
export default router