import { Op } from "sequelize";
import modelTemp from "../models/temp.model.js";
import modelAmbientTemp from "../models/ambientTemp.model.js";
import modelRelativeHumidity from "../models/relativeHumidity.model.js";

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
try {
    let { ipaddress, tcpport, slaveid, startreg, numregs, freqpolling, stopConn } = req.body;
    console.log(req.body);

    if(!ipaddress || !tcpport || !slaveid || !startreg || !numregs || !freqpolling){
        throw new Error("Completar todos los datos para conectarse al dispositivo");
    }
            
                function getData (){ //recnvertir a promesa y poner el setinterval y el clearinterval dentro de la promesa
                    const client = new ModbusRTU();                    
                    client.connectTCP(ipaddress, { port: tcpport }, async () => {
                    var registersArray = [];
                    client.setID(slaveid);
                    if(stopConn){

                        console.log("inicio clear");
                        client.destroy();
                        clearInterval(logger);
                        console.log("fin clear");
                    }
                    var logger = setInterval(() => {
                        
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
                    
                            let temp1 = registersArray[0], temp2 = registersArray[1], temp3 = registersArray[2], temp4 = registersArray[3], temp5 = registersArray[4], temp6 = registersArray[5], temp7 = registersArray[6], temp8 = registersArray[7], temp9 = registersArray[8], temp10 = registersArray[9], temp11 = registersArray[10], temp12 = registersArray[11];
                            let ambientTemp1 = registersArray[12], ambientTemp2 = registersArray[14], ambientTemp3 = registersArray[16], ambientTemp4 = registersArray[18], ambientTemp5 = registersArray[20], ambientTemp6 = registersArray[22], ambientTemp7 = registersArray[24], ambientTemp8 = registersArray[26];
                            let rh1 = registersArray[13], rh2 = registersArray[15], rh3 = registersArray[17], rh4 = registersArray[19], rh5 = registersArray[21], rh6 = registersArray[23], rh7 = registersArray[25], rh8 = registersArray[27];
                
                            console.log(temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp9, temp10, temp11, temp12);
                            console.log(ambientTemp1, ambientTemp2, ambientTemp3, ambientTemp4, ambientTemp5, ambientTemp6, ambientTemp7, ambientTemp8);
                            console.log(rh1, rh2, rh3, rh4, rh5, rh6, rh7, rh8);
                            console.log(`IMPRIMIENDO CLIENT: ${JSON.stringify(client)}`);

                    
                            await modelTemp.create({temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp9, temp10, temp11, temp12});   
                            await modelAmbientTemp.create({ambientTemp1, ambientTemp2, ambientTemp3, ambientTemp4, ambientTemp5, ambientTemp6, ambientTemp7, ambientTemp8});           
                            await modelRelativeHumidity.create({rh1, rh2, rh3, rh4, rh5, rh6, rh7, rh8});            
                        })
                        .catch(console.log)
                        
                    }, freqpolling)                  
                })
                }

            getData();
    
}catch(error)
    {
        console.log("Ha ocurrido un " + error);

    }
}