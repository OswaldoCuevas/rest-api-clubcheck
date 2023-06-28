import { Router } from "express";
import {  
         addSubscription,
         addListSubscriptions,
         getListSubscriptions,
         sync
        } from "../controllers/subscriptions.controller.js";

const router = new Router();

router.post("/" , addSubscription);

router.post("/sync", sync); 

router.post("/list/get" , getListSubscriptions);

router.post("/list/add" , addListSubscriptions);
export default router