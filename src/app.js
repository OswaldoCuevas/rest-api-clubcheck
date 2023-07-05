import express from "express";
import * as firebase from "./notifications.js";
import userRoutes from './routes/users.routes.js';
import aplicationsRoutes from './routes/applications.routes.js';
import subscriptionsRoutes from './routes/subscriptions.routes.js';
import customersRoutes from './routes/customers.routes.js';

import cors from 'cors';
import { ensuresToken } from "./ensure_token.js";
import path from 'path';
import fs from 'fs';

const app = express();
firebase.firebaseProgramed();
app.use(cors());

app.use(express.json());

app.get("/api", (req,res)=>{ res.send("connected")})

app.use("/api/customers", customersRoutes )

app.use("/api/subscriptions",ensuresToken,subscriptionsRoutes )

app.use("/api/users",userRoutes)

app.use((req,res,next) => {
    console.log("fuera");
    res.status(404).json({message:"endpoint not found"});
});
export default app;