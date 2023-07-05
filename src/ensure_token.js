import jwt  from "jsonwebtoken";
import { pool } from './db.js'
import { keyAuthorization } from './keys/keys.js';

export const ensuresToken = async (req, res, next) =>{
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != 'undefined')
     {
         req.token = bearerHeader
      
         jwt.verify(req.token,keyAuthorization,async (err, data) =>{
            if(err){
                console.log("no autorizado");
                res.sendStatus(403)
                
            }else{    
                console.log("verificado");
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