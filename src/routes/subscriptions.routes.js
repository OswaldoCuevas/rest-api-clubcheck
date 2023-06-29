import { Router } from "express";
import { ensuresToken } from "../ensure_token.js";
import {  
         addSubscription,
         addListSubscriptions,
         getListSubscriptions
        } from "../controllers/subscriptions.controller.js";

const router = new Router();

router.post("/" ,ensuresToken, addSubscription);

router.post("/list/get" , getListSubscriptions);

router.post("/list/add" , ensuresToken, addListSubscriptions);
export default router