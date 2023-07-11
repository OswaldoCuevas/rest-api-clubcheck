import admin from "firebase-admin";
import cron  from "node-cron";
import { pool } from './db.js';
import * as keys from './keys/keys.js'
admin.initializeApp({
  credential: admin.credential.cert(keys.serviceAccount)
});
export function firebaseProgramed(){
 cron.schedule('04 06 * * *', () => {
    SendMessages();
  },
  {
    timezone: 'America/Mexico_City'
  }).start();
}
async function SendMessages(){
  const [messages_firebase] = await pool.query('select code,name_user,name_customer,url_img,max(days_remaining) as days_remaining ,token from messages_firebase  group by code ;');
  for(let message_firebase of messages_firebase){
    setMessage(message_firebase)
  }
}
export async function setMessage(message_firebase){
      const nameSplit = message_firebase.name_user.split(" ");
      const name_user = nameSplit[0];
      const title = `¡Hola ${name_user}!`
      const token = message_firebase.token;
      //const logo = message_firebase.url_img == null ? "logo.png" : message_firebase.url_img;
      let body;
      switch (message_firebase.days_remaining){
        case 3: body = `Le informamos que su suscripción en ${message_firebase.name_customer} finaliza dentro de ${message_firebase.days_remaining} días`;break;
        case 2: body = `Le informamos que su suscripción en ${message_firebase.name_customer} finaliza dentro de ${message_firebase.days_remaining} días`;break;
        case 1: body = `Le informamos que su suscripción en ${message_firebase.name_customer} finaliza dentro de un día`;break;
        case 0: body = `Le informamos que su suscripción en ${message_firebase.name_customer} ha finalizado`;break;
      }
      if(message_firebase.days_remaining <= 3 && message_firebase.days_remaining >=0){
        SendFirebase(title,body,token)
      }
   
  }
export function SendFirebase(title,body,token){
const message = {notification: {title,body,},token};
    
    // // Envía el mensaje utilizando el módulo de administración de Firebase
admin.messaging().send(message)
  .then(function(response) {
    // console.log("Mensaje enviado exitosamente:", response);
  })
  .catch(function(error) {
    //console.log("Error al enviar el mensaje:", error);
  });
}
