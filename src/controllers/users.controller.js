import { pool } from '../db.js';

export const getUser = async (req, res) => {
    res.send("obteniendo usuario") 
}
export const addUser = async (req, res) => {
  res.send("añadiendo usuario") 
}
export const addListUsers = async (req, res) => {
    res.send("añadiendo lista de usuarios") 
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
          const [subscriptions] = await pool.query('SELECT * FROM subscriptions where user = ?;', [code]);
          try{
            const [customers] = await pool.query('SELECT * FROM customers where id = ?;', [user.customer]);
            const [customer] = customers;
              res.json({user,customer,subscriptions,attendance});
           }catch(e){
            //const codeError = e.code;
            res.status(500).json({e});
           }
         }catch(e){
         // const e = e.code;
          res.status(500).json({e});
         }
       }catch(e){
       // const e = e.code;
        res.status(500).json({e});
       }
     }catch(e){
     // const e = e.code;
     console.log(e+"sa");
      res.status(500).json({e});
     }
  }