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
export const sync = async (req, res) => {
    const subscriptions = req.body;
    let ArraySubscriptions = [];
 
    for(let subscription of subscriptions){
        const {start_date,ending_date,code,Id_subscription} = subscription
        const values = [code, start_date,ending_date]
        try{
            const [rows] = await pool.query('INSERT INTO subscriptions (user, start_date, ending_date) VALUES (?, ?, ?);', values);
            ArraySubscriptions.push({status:"success",Id_subscription})
    
        }catch(e){
             ArraySubscriptions.push({status:"error",message:"No se pudo sincronizar", Id_subscription})
             console.log("error: "+e);
        } 
     }
     res.json(ArraySubscriptions);
    }
    

export async function RegistrateSubscriptions(code,subscriptions){
   let ArraySubscriptions = [];
   for(let subscription of subscriptions){
       const {start_date,ending_date,Id_subscription} = subscription
       const values = [code, start_date,ending_date]
       if(typeof Id_subscription  === 'undefined'){
           ArraySubscriptions.push({status:"error", message:'No se recibió "Id_subscription"', Id_subscription})
       }else{
           try{
               const [rows] = await pool.query('INSERT INTO subscriptions (user, start_date, ending_date) VALUES (?, ?, ?);', values);
               ArraySubscriptions.push({status:"success",Id_subscription})
   
           }catch(e){
                ArraySubscriptions.push({status:"error",message:"No se pudo sincronizar", Id_subscription})
               console.log("error: "+e);
           } 
       }
   }
  return ArraySubscriptions;
  
}