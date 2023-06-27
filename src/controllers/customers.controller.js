import fs from 'fs';
import path from 'path';
import multer from 'multer';

export const addCustomer = async (req, res) => {
    res.send("añadiendo customer");
}
export const getCustomer = async (req, res) => {
    res.send("obteniendo customer");
}
export const editCustomer = async (req, res) => {
    res.send("actualizando customer");
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