import { pool } from '../db.js';
import * as Customers from './customers.controller.js';
import * as Firebase from '../notifications.js';
export const getUser = async (req, res) => {
  const {code} = req.body;
  try{
    const [users] = await pool.query('SELECT * FROM users where id = ?;', [code]);
    const [user] = users;
    res.json(user);
  }catch(e){
    const errorCode = e.code ;
    console.log(e) 
    res.status(500).json({errorCode});
  }
}
export const addUser = async (req, res) => {
  const {name} = req.body;
  const customer = req.customer.id
  const code = Customers.GenerateCode();
  const values = [code, customer, name];
  try{
      const [rows] = await pool.query('INSERT INTO users (id, customer, name) VALUES (?,?,?)', values);
      console.log("success");
      return res.json({status:"success",code});
  }catch(e){
    const errorCode =  e.code ;
    console.log(e);
    return res.json({status:"error"});
  }
}
export const addToken = async (req, res) => {
  const {code,token} = req.body;
  console.log("token añadido");
  try{
    const [select] = await pool.query('SELECT * FROM firebase where token = ?;',[token]);
    if(select.length > 0){
      const [rows] = await pool.query('UPDATE firebase SET code = ? WHERE (token = ?)', [code,token]);
      return res.json({status:"success",code});
    }
      const [rows] = await pool.query('INSERT INTO firebase (token,code) VALUES (?, ?)', [token,code]);
      return res.json({status:"success",code});
  }catch(e){
    const errorCode =  e.code ;
    console.log(e);
    return res.json({status:"error"});
  }
}
  export const sync = async (req, res) => {
    console.log("peticion realizada");
    const {code} = req.body;
    // {
    //   usuarios: objeto de usuario
    //   suscripciones: [objeto de suscripción],
    //   cliente : objeto cliente,
    //   asistencias : objeto de asistencia,
    // }
   
     try{
      const [users] = await pool.query('SELECT * FROM users where id = binary ?;', [code]);
      if(users.length < 1) return res.status(404).json({code,message:"Not Found"});
      const [user] = users;
      try{
        const [ArrayAttendances] = await pool.query('SELECT * FROM attendances where customer = ?;', [user.customer]);
        const [attendances] = ArrayAttendances;
        let ArrayAttendance = [];
        for(let attendance in attendances){
          if (attendance.includes("hour")) {
            ArrayAttendance.push(attendances[attendance]);
          }
        }
        const attendance = ArrayAttendance;
        try{
          const [subscriptions] = await pool.query('SELECT * FROM subscriptions_view where user = ? order by ending_date desc;', [code]);
          try{
            const [customers] = await pool.query('SELECT * FROM customers where id = ?;', [user.customer]);
            const [customer] = customers;
              res.json({user,customer,subscriptions,attendance});
           }catch(e){
            const errorCode =  e.code ;
            console.log(e);
            res.status(500).json({errorCode});
           }
         }catch(e){
          const errorCode =  e.code ;
          console.log(e);
          res.status(500).json({errorCode});
         }
       }catch(e){
        const errorCode =  e.code ;
        console.log(e);
        res.status(500).json({errorCode});
       }
     }catch(e){
      console.log(e);
      const errorCode =  e.code ;
      res.status(500).json({errorCode});
     }
  }