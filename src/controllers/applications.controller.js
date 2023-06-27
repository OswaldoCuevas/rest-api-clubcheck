import { pool } from '../db.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { PORT, DB_HOST } from '../config.js'

export const getApplications = async (req, res) => {

     try {
         const [rows] = await pool.query('Select * from applications_view');
         res.json(rows);  
     } catch (error) {
         return res.status(500).send("Error en el servidor porfavor intenta más tarde")
     }
    
   
}
export const getApplication = async (req, res) => {

     try {
         const [rows] = await pool.query('Select * from applications_view where id = ?' , [req.params.id]);
         res.json(rows);  
     } catch (error) {
         return res.status(500).send("Error en el servidor porfavor intenta más tarde")
     }
    
   
}
export const addApplication = async (req, res) => {
    const {name,price,code} = req.body;
    const url_img = `http://www.${DB_HOST}:${PORT}/api/applications/img/`+req.file.filename;
    const date = getDateToday();
 
     try {
         const values = [code, name,price, url_img, date];
         const [rows] = await pool.query('INSERT INTO applications (code, name, price, url_img, date_create) VALUES (?, ?, ?, ?, ?);',values);
         res.send({id:rows.insertId});
        
     } catch (error) {
         return res.status(500).send("Error en el servidor porfavor intenta más tarde")
     }
    
   
}
export const updateApplication = async (req, res) => {
    const {name,price,code} = req.body;
    const id = req.params.id;
    if(req.file === undefined){
        try {
            const values = [name,price,code,id];
            const [rows] = await pool.query('UPDATE applications SET name = ?, price = ?,code =? WHERE (id = ?);',values);
            res.send({id:rows.insertId});
                    
        } catch (error) {
            return res.status(500).send("Error en el servidor porfavor intenta más tarde")
        }
    }else{
            const url_img = `http://www.${DB_HOST}:${PORT}/api/applications/img/`+req.file.filename;
            try {
                const values = [name,price,code,url_img,id];
                const [rows] = await pool.query('UPDATE applications SET name = ?, price = ?,code =?, url_img = ? WHERE (id = ?);',values);
                res.send({id:rows.insertId});
                
            } catch (error) {
                return res.status(500).send("Error en el servidor porfavor intenta más tarde")
            }
    }
    res.status(200);

    
   
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
  });
export const upload = multer({ storage: storage });
const getDateToday = () =>{
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    
}
export const getImg =  async (req, res) => {
    const name = req.params.name;
    res.writeHead(200,{'content-type':'image/png'});
    fs.createReadStream(path.resolve() + '/uploads/'+name).pipe(res);
}