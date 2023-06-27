import express from "express";
// import paymentLogsRoutes from "./routes/payment_logs.routes.js";
// import paymentsRoutes from "./routes/payments.routes.js";
// import paymentsByDate from "./routes/payments_by_date.routes.js";
// import indexRoutes from './routes/index.routes.js';
// import loginRoutes from './routes/login.routes.js';
import userRoutes from './routes/users.routes.js';
import aplicationsRoutes from './routes/applications.routes.js';
import subscriptionsRoutes from './routes/subscriptions.routes.js';
import customersRoutes from './routes/customers.routes.js';
import attendancesRoutes from './routes/attendances.routes.js';

import cors from 'cors';
import { ensuresToken } from "./ensure_token.js";
import path from 'path';
import fs from 'fs';

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/customers", customersRoutes )

app.use("/api/attendances", attendancesRoutes )

app.use("/api/subscriptions",subscriptionsRoutes )

app.use("/api/users",userRoutes)

app.use((req,res,next) => {
    res.status(404).json({message:"endpoint not found"});
});
export default app;