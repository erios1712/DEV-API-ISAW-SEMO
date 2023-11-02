import app from "./app.js";
import ModbusRTU from "modbus-serial";
import sequelize from "./database/database.js"
import Prueba from "./models/prueba.model.js";

//configuracion dotenv
import dotenv from "dotenv";

//configuracion modulo path y dirname
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, "./.env")});

let ipIed = process.env.IP_IED;
let firstReg = process.env.FIRST_REG;

const main = async () => {

try {
// create an empty modbus client
const client = new ModbusRTU();
// open connection to a tcp line
client.connectTCP(ipIed, { port: 8502 });
client.setID(1);
// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
var newArr = [];
setInterval(async function() {   
    client.readHoldingRegisters(firstReg, 10, function(err, data) {
        console.log(err);
        console.log(data.data);
        newArr = [...data.data];
        console.log(newArr);
        
    });
    let reg1 = newArr[0];
    let reg2 = newArr[1];
    let reg3 = newArr[2];
    let reg4 = newArr[3];
    let reg5 = newArr[4];
    console.log(reg1);
    console.log(reg2);
    console.log(reg3);
    console.log(reg4);
    console.log(reg5);
    
    await Prueba.create({
        reg1,
        reg2,
        reg3,
        reg4,
        reg5
    });
    return newArr;
}, 5000);
     

// init connection with database
    await sequelize.authenticate();
    await sequelize.sync({force: true, alter: true});

//start server
    app.listen(3000, () => {
        console.log("Servidor escuchando en puerto 3000.");
    });    
} catch (error) {
    console.log("Ha ocurrido un error.");    
};
};



main();