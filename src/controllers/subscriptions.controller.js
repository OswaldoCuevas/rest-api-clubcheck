import { pool } from '../db.js';
import * as Firebase from '../notifications.js';
import moment from 'moment-timezone';
moment.tz.setDefault('America/Mazatlan');
export const addSubscription = async (req, res) => {
    const {start_date,ending_date,code} = req.body
    const values = [code, start_date,ending_date]
    try{
       
        await pool.query('INSERT INTO subscriptions (user, start_date, ending_date) VALUES (?, ?, ?);', values);
        const [rows] = await pool.query(' SELECT * FROM messages_firebase where code = ?;', [code]);
        for(let row of rows){
            const user = row;
            const nameSplit = user.name_user.split(" ");
            const name = nameSplit[0];
            const token = user.token;
            const customer = user.name_customer;
            const title = `¡Hola ${name}!`
            const body =` Su suscripción a ${customer} con inicio en ${formateDate(start_date)} y fin en ${formateDate(ending_date)} fue registrada con éxito.`;
            Firebase.SendFirebase(title,body,token)
        }
        res.json({status: 'success'});
    }catch(e){
        const codeError = e.code;
        res.status(500).json({status: 'error'});
        console.log("error: "+e);
    }
}
function formateDate(date){
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre","Diciembre"];
    const splitDate = date.split("T");
    date = splitDate[0].split("-");
    const year =  date[0];
    const month =  date[1];
    const day =  date[2];
   return ""+day+" de "+ months[month-1] + " del " + year;
 }
export const addListSubscriptions = async (req, res) => {
    const subscriptions = req.body;
    let ArraySubscriptions = [];
 

        try{
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
        }catch(e){
            return res.json({status:"error",message:"tipo incompatible"});
        }
     res.json(ArraySubscriptions);
 }
 export const getListSubscriptions = async (req, res) => {
    try{
        const {code} = req.body;
        const [rows] = await pool.query('SELECT * FROM subscriptions_view where user = ?;', [code]);
        res.json(rows);
    }catch(e){
        const codeError = e.code;
        res.status(500).json({codeError});
        console.log("error: "+e);
    }

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
