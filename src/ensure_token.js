import jwt  from "jsonwebtoken";
import { pool } from './db.js'
export const ensuresToken = async (req, res, next) =>{
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != 'undefined')
     {
         const bearer = bearerHeader.split(" ");
         const bearerToken = bearer[1];
         req.token = bearerToken
      
         jwt.verify(req.token,"secret_pasword_mobemmanuel",async (err, data) =>{
            if(err){
                res.sendStatus(403)
                
            }else{
                try{
                    const {user_id} = data;
                    const [rows] = await pool.query("SELECT * FROM users where user_id=?;",[user_id]);
                    req.user = rows[0];
                }catch (e){
                    return res.status(500).send({error:e.message});
                }   
               
                next();
                
            }
        })
         
     }else{
         res.sendStatus(403)
     }
 }