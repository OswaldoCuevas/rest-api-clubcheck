import { pool } from '../db.js';
import * as Customers from './customers.controller.js';
export const getUser = async (req, res) => {
  const {code} = req.body;
  try{
    const [users] = await pool.query('SELECT * FROM users where id = ?;', [code]);
    const [user] = users;
    res.json(user);
  }catch(e){
    const errorCode =  e.code ;
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
      return res.json(rows);
  }catch(e){
    const errorCode =  e.code ;
    res.status(500).json({errorCode});
  }
}
  export const sync = async (req, res) => {
    const {code} = req.body;
    // {
    //   usuarios: objeto de usuario
    //   suscripciones: [objeto de suscripción],
    //   cliente : objeto cliente,
    //   asistencias : objeto de asistencia,
    // }
   
     try{
      const [users] = await pool.query('SELECT * FROM users where id = ?;', [code]);
      const [user] = users;
      try{
        const [attendances] = await pool.query('SELECT * FROM attendances where customer = ?;', [user.customer]);
        const [attendance] = attendances;
        try{
          const [subscriptions] = await pool.query('SELECT * FROM subscriptions_view where user = ?;', [code]);
          try{
            const [customers] = await pool.query('SELECT * FROM customers where id = ?;', [user.customer]);
            const [customer] = customers;
              res.json({user,customer,subscriptions,attendance});
           }catch(e){
            const errorCode =  e.code ;
            res.status(500).json({errorCode});
           }
         }catch(e){
          const errorCode =  e.code ;
          res.status(500).json({errorCode});
         }
       }catch(e){
        const errorCode =  e.code ;
        res.status(500).json({errorCode});
       }
     }catch(e){
      const errorCode =  e.code ;
      res.status(500).json({errorCode});
     }
  }