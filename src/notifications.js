import admin from "firebase-admin";
import cron  from "node-cron";
const serviceAccount = {
  "type": "service_account",
  "project_id": "clubcheck-1222d",
  "private_key_id": "90bc3ffd4a25ada456dd71e26c58a6fa9af11399",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZmOTg4GNDhrLL\nbMOMDf4L9YtD/QU+j3YibpIeVR3AvheRg2+1k2QWdMUvc13xCzw6kkiDZUQmeYXM\ns43HFHr6YcShg8grWp4XXrYuckHAj64DcQ5PeAP2trp+CicohAj4GSt3fV1ob8eB\nP8sTtgUjzlDFk3FpR5UXZOtOUGBZIo9CvEOmkBBvFadM8r7WnT/j0ecMeL+b+UFW\npUkvgo5qHngSceNCeIVAFEbUFihoKofR3wiAat1roj+Zah5vvNEmUXmRRLnjJRDB\nFEmMfdBcB8OcyNT82Ls9xvAJISjcD9FcesuSXrGdSYAEuelsiIpZ3a9jFOiSq4bu\nXCereoLlAgMBAAECggEAEmTX9qzd1lFZig5NYLFa8hhcBC6seRskZ5KG7HD/A30A\nROHQ9+qzEBQNz9U+CRwdAK/8qmzvJg25iJPGxRzebqup/jmnjWGTEHNm19XBAAwf\nfQlbUF2sA9igKXCSfeyfR67OoMb3mlvV2tRGlTwKuN3/7ZlET0+jkCNQIUHI4q5B\niAg4fmbd3mM9xUCTj5XJtHFGHWyNkxnDTmSiyDNXKtdkgEgzqRQjUveeKCfqUl+a\nabLOTZmPtX5zQSzLcTEy0LnquuMII9/ojkUHCsVUQ84Y2BVgv7BMxU4V9HrnAjJb\no/PaIhssmJ09h32HV8Oyl0wzpDzBY1/KbD+fKnjpRQKBgQDWIqpHX2V8IuJkpm7h\nBSzphrlsfbMIAk8bPLCNeQTc5qtyMybskeBx9gV7TdZ1KqNYt77ivb2Ww2qOCEZ9\nZFl0FUFW5TXkLtKWLZGmgwrDaR+JAJqyx5Bql/LajBsYHZ6soqhhJTAQMQ7GfBjc\n/d3RMHuB2Bp6Di78ilb+NqtvcwKBgQC3oFV3dRTNmZFFs1Kj+v6AJrMgR6R33UWE\nyZjXbtXTwcEAmUKMyl6AaoaevGHTPY1gqUqbEJAo0gHkcS6y/vNUesbvjfsOaLjX\n0MU2MifrG7vK2oSAcMQWOvFSwob6pawy7S4JuabAhp99OGAGGEJrecXZztrkHQw4\naJXVLZx+RwKBgE6Zutcn9SBzzZYUYW7Hb4zonvdrzGOMNW1SAZxsZ5SONzBcBlWf\n1jr+i1SPZcDsPbk6+R5Rd133rQ0ljHpKc2tgwfMbf4Sai0IEyAnO4AyKccDgL+if\nyCrYS5RdCTT46l2D9zpxZAsNdtb0hkvYA6vdl/g5Ur6qpiScwwHdH2BxAoGAclvB\nPn9FMHJWXfE7I3Lacxcm8ZCMpjXA6NzgejLFqnZ9a5EHOEWEKzeslUk/J16rIKru\nErpy/Wkk0o+GhOVwx4kbQe/LjgK8M3QKjiEYaTzBbKlAYflYtXuJ9X++rnTlVGYQ\nCPB9IGP3CfZFHyaWnvacuHQyMGTCypKf1b7tOlsCgYEAixnoBnEnmtPa96MJW6g/\n3UPx4HigKt5SOddgeMOMZRlrD4WKCwTO5j2G5njB6sVEo632s5sCk3Ny78TzaBqi\n4PVBLqTZV6Smt/m/JbVYur2UituMLLPSYoPABJC/aOjkkAEML/Nj/acc04ZxacyX\nbW/B8SZO4Nx6E+cdySYTGqg=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-igjyw@clubcheck-1222d.iam.gserviceaccount.com",
  "client_id": "100063957420406784814",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-igjyw%40clubcheck-1222d.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
export function firebaseProgramed(){

  
  // Utilizando node-cron para programar la función a las 8:40 PM todos los días
  const tareaDiaria = cron.schedule('45 21 * * *', () => {
    console.log('La función se está ejecutando a las 8:44 PM.');
  }, {
    timezone: 'America/Mexico_City' // Asegúrate de ajustar la zona horaria a tu ubicación.
  });
  
  // Iniciar la tarea programada
  tareaDiaria.start();
  
}
  export function setMessage(token){
  
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    var registrationToken = "TOKEN_DEL_DISPOSITIVO_AQUI";
    
    // Construye el mensaje a enviar
    var message = {
      notification: {
        title: "Notificacion de clubcheck",
        body: "Cuerpo de la notificación"
      },
      token: "fWDgORBsR3SuuVJxYHVnPH:APA91bHHrYS1j_13ds-WiEM_xjRrIKfmT1A3X1cZcQ_7h7kiNEXmHCxLp5qfrfPqcPXQgYuVwfBGvlpYJ8m-OyEY_zZep33hICupREhMef3F0T-nvE1HgcBs5S-MUQw2ezfjtAUvTowB"
    };
    
    // Envía el mensaje utilizando el módulo de administración de Firebase
    admin.messaging().send(message)
      .then(function(response) {
        console.log("Mensaje enviado exitosamente:", response);
      })
      .catch(function(error) {
        console.log("Error al enviar el mensaje:", error);
      });
  }
