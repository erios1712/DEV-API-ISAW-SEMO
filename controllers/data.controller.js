import { Op } from "sequelize";
import modelTemp from "../models/temp.model.js";
import ModbusRTU from "modbus-serial";


export const findAll = async (req, res) => {
    try {      
        let temperatures = await modelTemp.findAll();

        res.json(temperatures);
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

            function Int16 (value) {
                var ref = value & 0xFFFF;
                return (ref > 0x7FFF) ? ref - 0x10000 : ref;
            };
            
            let tempArray = [...data.data];
            registersArray = tempArray.map(Int16);
            return registersArray;
            
        })
        .then(async function(registersArray){

            let temp1 = registersArray[0];
            let temp2 = registersArray[1];
            let temp3 = registersArray[2];
            let temp4 = registersArray[3];
            let temp5 = registersArray[4];
            let temp6 = registersArray[5];
            let temp7 = registersArray[6];
            let temp8 = registersArray[7];
            let temp9 = registersArray[8];
            let temp10 = registersArray[9];
            let temp11 = registersArray[10];
            let temp12 = registersArray[11];

            console.log(temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp9, temp10, temp11, temp12);

            await modelTemp.create({
                temp1,
                temp2,
                temp3,
                temp4,
                temp5,
                temp6,
                temp7,
                temp8,
                temp9,
                temp10,
                temp11,
                temp12,
                })            
        })
        .then(
            res.status(200).json
            ({
                code: 200,
                message: `datos leidos y almacenados con éxito.`,
            })
            )
        .catch(console.log)
    })}catch(error)
    {
    console.log("Ha ocurrido un error al almacenar los registros en la base de datos.");
    }
}






