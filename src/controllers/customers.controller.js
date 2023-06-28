import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { pool } from '../db.js';

export const addCustomer = async (req, res) => {
    const {id,name} = req.body;
    //Registro el usuario en la base de datos 
    try{
        const [rows] = await pool.query('INSERT INTO customers(id,name) VALUES (?,?)', [id,name]);
        res.json(rows);
    }catch(e){
        const codeError = e.code;
        res.status(500).json({codeError});
    }

}
export const getCustomer = async (req, res) => {
    const {id} = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM customers WHERE id =?', [id]);
        const [customer] = rows;
        res.json(customer);
    } catch (error) {
        const codeError = e.code;
        res.status(500).json({codeError});
    }
}
export const editCustomer = async (req, res) => {
    const {name, url_img, id} = req.body;
   try{
    const [rows] = await pool.query('UPDATE customers SET name = IFNULL(?,name), url_img = IFNULL(?,url_img) WHERE (id = ?)', [name, url_img,id]);
    res.json(rows);
   }catch(e){
    const codeError = e.code;
    res.status(500).json({codeError});
   }
  
}
export const sync = async (req, res) => {// esta funcion registra masivamente la informacion enviada desde una app
    const { attendances } = req.body;
    const customer = "id_customer1"
     if(attendances.length == 24) {// verificon que me haya enviado las 24 horas
      const totalUsers = attendances.reduce((total, elemento) => total + elemento, 0); // obtengo la cantidad de usuarios totales 
      const averageAttendance = attendances.map(hour =>  //con el array de 24 horas creo un nuevo arreglo pero promediado
        {
          const average = (hour/totalUsers)*100 // promedio el valor con el total de usaurios
          return  average - Math.floor(average) > 0.5 ? Math.ceil(average) : Math.floor(average);// retorno el valor redondeado
        })
        averageAttendance.push(customer)// añado la id de customer para poder agregarlo al sql
      const updates = new Array(24).fill("hour").map((hour,i) => `${hour+(i+1)} = IFNULL(?,${hour+(i+1)})`).join(",");// creo las columnas y su valor de actualización para añadirlo al sql (del hour1 al hour24)
      try{
        const [rows] = await pool.query('UPDATE attendances SET '+updates+' WHERE (customer = ?)',averageAttendance );// actualizo las attendances
        res.json(rows);
       }catch(e){
        console.log(e);
        const codeError = e.code;
        res.status(500).json({codeError});
       } 
     }else{
       res.status(500).send("Registros : "+attendances.length+" necesarios : 24");
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