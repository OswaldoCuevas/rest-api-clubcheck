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
  export const InComingSync = async (req, res) => {
    const { attendances } = req.body;
    const customer = "id_customer1"
     if(attendances.length == 24) {
      const totalUsers = attendances.reduce((total, elemento) => total + elemento, 0);
      const averageAttendance = attendances.map(hour =>  
        {
          const average = (hour/totalUsers)*100
          return  average - Math.floor(average) > 0.5 ? Math.ceil(average) : Math.floor(average);
        })
        averageAttendance.push(customer)
      const updates = new Array(24).fill("hour").map((hour,i) => `${hour+(i+1)} = IFNULL(?,${hour+(i+1)})`).join(",");
      try{
        const [rows] = await pool.query('UPDATE attendances SET '+updates+' WHERE (customer = ?)',averageAttendance );
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
  export const OutBoundSync = async (req, res) => {
    const user_id = "id_user1";
    // {
    //   usuarios: objeto de usuario
    //   suscripciones: [objeto de suscripción],
    //   cliente : objeto cliente,
    //   asistencias : objeto de asistencia,
    // }
   
     try{
      const [users] = await pool.query('SELECT * FROM users where id = ?;', [user_id]);
      const [user] = users;
      try{
        const [attendances] = await pool.query('SELECT * FROM attendances where customer = ?;', [user.customer]);
        const [attendance] = attendances;
        try{
          const [subscriptions] = await pool.query('SELECT * FROM subscriptions where user = ?;', [users.id]);
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