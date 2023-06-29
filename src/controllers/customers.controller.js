import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { pool } from '../db.js';
import jwt  from "jsonwebtoken";
import { keyApplication,keyAuthorization } from '../keys/keys.js';
import { error } from 'console';
import  * as Subscriptions from './subscriptions.controller.js';
export const addCustomer = async (req, res) => {
    const {id,name,key} = req.body;
    try{
        if(key == keyApplication){
            const [rows] = await pool.query('INSERT INTO customers(id,name) VALUES (?,?)', [id,name]);
            const token = jwt.sign({id},keyAuthorization)
            res.json({text:"logeado",token});
        }else{
            res.sendStatus(403)
        }
        
    }catch(e){
        const codeError = e.code;
        console.log(e);
        res.status(500).json({codeError});
    }

}
export const getCustomer = async (req, res) => {
    res.json(req.customer);
}
export const editCustomer = async (req, res) => {
    const customer = req.customer.id;
    const {name, url_img} = req.body;
   try{
    const [rows] = await pool.query('UPDATE customers SET name = IFNULL(?,name), url_img = IFNULL(?,url_img) WHERE (id = ?)', [name, url_img,customer]);
    res.json(rows);
   }catch(e){
    const codeError = e.code;
    res.status(500).json({codeError});
   }
  
}
export const sync = async (req, res) => {// esta funcion registra masivamente la informacion enviada desde una app
    let { attendances,users } = req.body;
    const customer = req.customer.id;
     if(typeof attendances === 'undefined' ){
        
     } else{
        attendances = await registerAttendance(attendances,customer);
        console.log(attendances);
        if(attendances.number_error==400){
            return res.status(400).json(attendances);
        }
        if(typeof users === 'undefined' ){
            return res.json({status: 'success'});
        }
     }
    
    try{
        let arrayUserSync = [];
        for (const user of users){
            const userSync = await RegistrateUser(customer,user);
            arrayUserSync.push(userSync);
        }
        res.json(arrayUserSync)
    }catch(e){
     
        const codeError = e.code;
        res.status(500).json({codeError});
    } 
   
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
async function registerAttendance(attendances,customer){
    if(attendances.length == 24) {// verificon que me haya enviado las 24 horas
        const averageAttendance = ArrayAverage(attendances);
        averageAttendance.push(customer)// añado la id de customer para poder agregarlo al sql
        try{
                const updates = new Array(24).fill("hour").map((hour,i) => `${hour+(i+1)} = IFNULL(?,${hour+(i+1)})`).join(",");// creo las columnas y su valor de actualización para añadirlo al sql (del hour1 al hour24)
                const [rows] = await pool.query('UPDATE attendances SET '+updates+' WHERE (customer = ?)',averageAttendance );// actualizo las attendances
                return {status:"success"};
        }catch(e){
                console.log(e);
                const codeError = e.code;
                return {status:"error", number_error:500 ,message:codeError};
        } 
    }else{
        return {status:"error", number_error:400 ,message:"Registros : "+attendances.length+" necesarios : 24"};
    }
}
function ArrayAverage(array){
    const totalUsers = array.reduce((total, elemento) => total + elemento, 0); // obtengo la cantidad de usuarios totales 
    return array.map(hour =>  //con el array de 24 horas creo un nuevo arreglo pero promediado
      {
        const average = (hour/totalUsers)*100 // promedio el valor con el total de usaurios
        return  average - Math.floor(average) > 0.5 ? Math.ceil(average) : Math.floor(average);// retorno el valor redondeado
      })
}
export function GenerateCode(){
    const size = 9;
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return new Array(size).fill("").map(element => {
        var randomIndex = Math.floor(Math.random() * caracteres.length);
        return caracteres.charAt(randomIndex);
    }).join("");

}
async function RegistrateUser(customer,user){
    const {name,Id_user} = user
    const arraySubscription = (typeof user.subscriptions === 'undefined')?[]:user.subscriptions;
    const code = GenerateCode();
    const values = [code, customer, name]
    if (typeof Id_user === 'undefined') {
        return { status : "error", number_error:400 , message: 'Falta el campo Id_user' };
      }
    try{
        const [rows] = await pool.query('INSERT INTO users (id, customer, name) VALUES (?,?,?)', values);
        const subscriptions = await Subscriptions.RegistrateSubscriptions(code,arraySubscription)
        return {status:"success",name,Id_user,code,subscriptions}
    }catch(e){

        const codeError = e.code;
        console.log("error detectado" +e);
        return codeError == "ER_DUP_ENTRY" ?RegistrateUser(customer,user):{status:"error", number_error:500 ,message:codeError};
    } 
}

