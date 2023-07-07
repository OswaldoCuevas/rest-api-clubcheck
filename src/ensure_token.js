import jwt  from "jsonwebtoken";
import { pool } from './db.js'
import { keyAuthorization } from './keys/keys.js';

export const ensuresToken = async (req, res, next) =>{
    const bearerHeader = req.headers['authorization'] //recibo la cabecera authorization
    if(typeof bearerHeader != 'undefined') // verifico si se recibio
     {
         req.token = bearerHeader //añado el token a los parametros req
      
         jwt.verify(req.token,keyAuthorization,async (err, data) =>{
            if(err){// si existe un error al verificar el token entonces se deniega el accesso
                console.log("no autorizado");
                res.sendStatus(403)//se envia el código de erro 403 que es forbidden
                
            }else{    
                console.log("verificado");//si se verifica entonces puede acceder 
                const {id} = data
                const [rows] = await pool.query("SELECT * FROM customers where id=?;",[id]);
                req.customer = rows[0];         
                next();
                
            }
        })
         
     }else{
        console.log("no autorizado");
         res.sendStatus(403)
     }
 }