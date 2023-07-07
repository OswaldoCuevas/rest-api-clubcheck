import express from "express"; //importo el modulo de express
import * as firebase from "./notifications.js";//importo em lmoudlo de las ntoficaciones de firebase
//importo todas los routes
import userRoutes from './routes/users.routes.js';
import subscriptionsRoutes from './routes/subscriptions.routes.js';
import customersRoutes from './routes/customers.routes.js';

import cors from 'cors';//importo los cors

import { ensuresToken } from "./ensure_token.js";//importo el ensures token

const app = express(); //empiezo autilizar express

firebase.firebaseProgramed();//activo los mensajes progamados
app.use(cors());//activo los cords para permitirle el acceso a todos

app.use(express.json());//acepto los mendajes json

app.get("/api", (req,res)=>{ res.send("connected")})//añado la ruta principal para saber si hay acceso a la api

app.use("/api/customers", customersRoutes )//rutas de customers

app.use("/api/subscriptions",ensuresToken,subscriptionsRoutes )//rutas de subscriptions

app.use("/api/users",userRoutes)//rutas de users

app.use((req,res,next) => {//se muestra si la ruta no existe
    console.log("fuera");
    res.status(404).json({message:"endpoint not found"});
});
export default app;