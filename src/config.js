import { config } from "dotenv";

config()

export const PORT = process.env.PORT || 8080;
export const DB_HOST = process.env.DB_HOST || 'database-clubcheck.c6xdppiwfm82.us-east-2.rds.amazonaws.com';
export const DB_USER = process.env.DB_USER || 'admin';
export const DB_PASSWORD = process.env.DB_PASSWORD || '1mOud^E2VuWleP0knSa%';
export const DB_DATABASE = process.env.DB_DATABASE || 'clubcheck';
export const DB_PORT = process.env.DB_PORT || 3306;
