import { Op } from "sequelize";
import modelData from "../models/prueba.model.js";
//import myModule from "./connection.controller.js";
import ModbusRTU from "modbus-serial";


export const findAll = async (req, res) => {
    try {      
        let registersData = await modelData.findAll();

        res.json({ code: 200, message: "ok", registersData });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al leer los registros.",
        });
    }
};

export const saveRegisters = async (req, res) => {
let { ipaddress, tcpport, slaveid, startreg, numregs, freqpolling } = req.body;

try {

    const client = new ModbusRTU();
    client.connectTCP(ipaddress, { port: tcpport }, async () => {

        var registersArray = [];
            
        client.setID(slaveid);
        client.readHoldingRegisters(startreg, numregs)
        .then(function(data){
        registersArray = [...data.data];
        return registersArray;
                
        })
        .then(async function(registersArray){

        let reg1 = registersArray[0];
        let reg2 = registersArray[1];
        let reg3 = registersArray[2];
        let reg4 = registersArray[3];
        let reg5 = registersArray[4];

        console.log(reg1, reg2, reg3, reg4, reg5);


        await modelData.create({
            reg1,
            reg2,
            reg3,
            reg4,
            reg5,
            })            
        }
           
        )
        .then(
            res.status(200).json({
                code: 200,
                message: `datos leidos y almacenados con éxito.`,
            })
        )
        })
    .catch(console.log)
    }catch(error){
    console.log("Ha ocurrido un error al almacenar los registros en la base de datos.");

}
}






