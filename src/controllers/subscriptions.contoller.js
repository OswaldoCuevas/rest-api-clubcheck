import { pool } from '../db.js';
import moment from 'moment-timezone';
moment.tz.setDefault('America/Mazatlan');
export const addSubscription = async (req, res) => {
   res.send("Añadiendo suscripción");
}
export const addListSubscriptions = async (req, res) => {
    res.send("Añadiendo lista de suscripciones");
 }
 export const getListSubscriptions = async (req, res) => {
   res.send("Obteniendo lista de suscripciones");
}